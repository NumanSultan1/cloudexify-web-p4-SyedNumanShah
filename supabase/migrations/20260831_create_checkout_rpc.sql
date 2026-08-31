-- Migration to create an atomic checkout RPC
BEGIN;

CREATE OR REPLACE FUNCTION public.create_order(
  p_customer_name text,
  p_phone text,
  p_order_type public.order_type,
  p_notes text,
  p_cart_items jsonb
)
RETURNS public.orders
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_customer_id uuid;
  v_order_number text;
  v_order_id bigint;
  v_total numeric(12,2) := 0;
  v_item record;
  v_menu_item record;
  v_subtotal numeric(10,2);
  v_created_order public.orders;
BEGIN
  v_customer_id := auth.uid();
  IF v_customer_id IS NULL THEN
    RAISE EXCEPTION 'You must be logged in to place an order.';
  END IF;

  IF jsonb_array_length(p_cart_items) = 0 THEN
    RAISE EXCEPTION 'Cannot create an order without cart items.';
  END IF;

  v_order_number := 'BB-' || right(replace(gen_random_uuid()::text, '-', ''), 5);

  -- Calculate total based on server-side prices
  FOR v_item IN SELECT * FROM jsonb_to_recordset(p_cart_items) AS x(id bigint, quantity integer)
  LOOP
    SELECT * INTO v_menu_item FROM public.menu_items WHERE id = v_item.id AND available = true;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Menu item % is not available.', v_item.id;
    END IF;
    v_total := v_total + (v_menu_item.price * v_item.quantity);
  END LOOP;

  -- Insert order
  INSERT INTO public.orders (
    order_number, customer_id, customer_name, phone, order_type, notes, status, total
  ) VALUES (
    v_order_number, v_customer_id, p_customer_name, p_phone, p_order_type, p_notes, 'Pending', v_total
  ) RETURNING * INTO v_created_order;

  v_order_id := v_created_order.id;

  -- Insert order items
  FOR v_item IN SELECT * FROM jsonb_to_recordset(p_cart_items) AS x(id bigint, quantity integer)
  LOOP
    SELECT * INTO v_menu_item FROM public.menu_items WHERE id = v_item.id;
    v_subtotal := v_menu_item.price * v_item.quantity;
    
    INSERT INTO public.order_items (
      order_id, menu_item_id, product_name, quantity, unit_price, subtotal
    ) VALUES (
      v_order_id, v_item.id, v_menu_item.name, v_item.quantity, v_menu_item.price, v_subtotal
    );
  END LOOP;

  RETURN v_created_order;
END;
$$;

COMMIT;
