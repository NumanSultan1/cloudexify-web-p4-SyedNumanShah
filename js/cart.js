const CART_STORAGE_KEY = 'brewBiteCart';
const ORDER_STORAGE_KEY = 'brewBiteOrders';

function readStoredJson(key, fallback = []) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

const cart = readStoredJson(CART_STORAGE_KEY, []);
const orderStore = readStoredJson(ORDER_STORAGE_KEY, []);

function persistCart() {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function persistOrders() {
  sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderStore));
}

function addToCart(itemId) {
  const item = window.menuItems?.find((entry) => entry.id === itemId);
  if (!item) return;

  const existingItem = cart.find((entry) => entry.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  persistCart();
  updateCartUI();
  showCartFeedback(`${item.name} added to your cart.`);
}

function removeFromCart(itemId) {
  const index = cart.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    cart.splice(index, 1);
    persistCart();
    updateCartUI();
  }
}

function updateQuantity(itemId, change) {
  const item = cart.find((entry) => entry.id === itemId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(itemId);
    return;
  }

  persistCart();
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  const cartBadge = document.getElementById('cartCountBadge');
  const cartPreviewCount = document.getElementById('cartPreviewCount');
  const cartPreviewTotal = document.getElementById('cartPreviewTotal');

  if (!cartItemsContainer) return;

  if (!cart.length) {
    cartItemsContainer.innerHTML = '<div class="empty-state">Your cart is empty. Add a few cafe favorites to get started.</div>';
    if (cartSubtotal) cartSubtotal.textContent = 'Rs. 0';
    if (cartTotal) cartTotal.textContent = 'Rs. 0';
    if (cartBadge) cartBadge.textContent = '0';
    if (cartPreviewCount) cartPreviewCount.textContent = '0';
    if (cartPreviewTotal) cartPreviewTotal.textContent = 'Rs. 0';
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <div class="cart-item-meta">${item.category}</div>
            <div class="item-quantity-controls">
              <button class="quantity-btn" type="button" data-action="decrease" data-item-id="${item.id}" aria-label="Decrease quantity for ${item.name}">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" type="button" data-action="increase" data-item-id="${item.id}" aria-label="Increase quantity for ${item.name}">+</button>
            </div>
          </div>
          <div class="cart-price-block d-flex flex-column align-items-end gap-2">
            <span class="cart-item-price">${formatCurrency(item.price * item.quantity)}</span>
            <button class="cart-remove" type="button" data-action="remove" data-item-id="${item.id}">
              Remove
            </button>
          </div>
        </div>
      `
    )
    .join('');

  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
  const total = getCartTotal();

  if (cartBadge) cartBadge.textContent = totalItems;
  if (cartBadge) {
    cartBadge.classList.remove('bump');
    requestAnimationFrame(() => cartBadge.classList.add('bump'));
    setTimeout(() => cartBadge.classList.remove('bump'), 260);
  }
  if (cartPreviewCount) cartPreviewCount.textContent = totalItems;
  if (cartPreviewTotal) cartPreviewTotal.textContent = formatCurrency(total);
  if (cartSubtotal) cartSubtotal.textContent = formatCurrency(total);
  if (cartTotal) cartTotal.textContent = formatCurrency(total);

  cartItemsContainer.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', function () {
      const itemId = Number(this.dataset.itemId);
      const action = this.dataset.action;

      if (action === 'increase') updateQuantity(itemId, 1);
      if (action === 'decrease') updateQuantity(itemId, -1);
      if (action === 'remove') removeFromCart(itemId);
    });
  });
}

function updateCartUI() {
  renderCart();
}

function showCartFeedback(message) {
  const feedback = document.getElementById('cartFeedback');
  if (!feedback) return;
  feedback.textContent = message;
  window.clearTimeout(showCartFeedback.timer);
  showCartFeedback.timer = window.setTimeout(() => {
    feedback.textContent = '';
  }, 1900);
}

function animateAddToCart(button, imageUrl) {
  const cartTarget = document.getElementById('cartCountBadge');
  if (!button || !cartTarget || !imageUrl) return;

  const start = button.getBoundingClientRect();
  const end = cartTarget.getBoundingClientRect();
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = '';
  image.className = 'fly-image';
  image.style.left = `${start.left + start.width / 2 - 40}px`;
  image.style.top = `${start.top + start.height / 2 - 40}px`;
  document.body.appendChild(image);

  requestAnimationFrame(() => {
    image.style.transform = `translate(${end.left - start.left}px, ${end.top - start.top}px) scale(0.18)`;
    image.style.opacity = '0';
  });

  window.setTimeout(() => image.remove(), 660);
}

function getStoredOrders() {
  return readStoredJson(ORDER_STORAGE_KEY, []);
}

function hydrateCustomerOrders() {
  const customerOrders = document.getElementById('customerOrders');
  if (!customerOrders) return;

  const orders = [...getStoredOrders()].reverse();
  if (!orders.length) {
    customerOrders.innerHTML = '<div class="empty-state">No orders yet. Your next brew and bite will appear here.</div>';
    return;
  }

  customerOrders.innerHTML = orders
    .map((order) => {
      const steps = ['Pending', 'Preparing', 'Ready', 'Completed'];
      const currentIndex = steps.indexOf(order.status || 'Pending');
      const statusClass = (order.status || 'Pending').toLowerCase().replace(/\s+/g, '-');
      const displayItems = order.items || (order.itemLines || []).map((line) => `${line.name} x ${line.quantity}`).join(', ');
      return `
        <div class="order-card">
          <div>
            <div class="order-heading-row">
              <span class="order-status status-${statusClass}">${order.status || 'Pending'}</span>
              <h3>${order.id}</h3>
            </div>
            <div class="order-meta">
              <span>${order.date}</span>
              <span>${displayItems}</span>
              <span>${formatCurrency(order.total)}</span>
            </div>
          </div>
          <div class="order-progress" aria-label="${order.status || 'Pending'} progress">
            ${steps.map((step, index) => `<span class="progress-step ${index <= currentIndex ? 'active' : ''}">${step}</span>`).join('')}
          </div>
        </div>
      `;
    })
    .join('');
}

async function createOrderFromCart(customerName, phone, orderType, notes, tableInfo) {
  const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
  if (!client) throw new Error('Supabase client not initialized. Please refresh and try again.');

  const { data: { session }, error: sessionError } = await client.auth.getSession();
  if (sessionError || !session) {
    throw new Error('You must be logged in to place an order. Please log in and try again.');
  }

  const cartSnapshot = cart.map((item) => ({ ...item }));

  if (!cartSnapshot.length) {
    throw new Error('Cannot create an order without cart items.');
  }

  // Build cart items payload for the RPC: only id and quantity are needed.
  // The RPC looks up server-side prices from menu_items — client prices are not trusted.
  const cartItems = cartSnapshot.map((item) => ({ id: item.id, quantity: item.quantity }));

  const fullNotes = notes + (tableInfo ? ` | Table: ${tableInfo}` : '');

  const { data: orderData, error: rpcError } = await client.rpc('create_order', {
    p_customer_name: customerName,
    p_phone: phone,
    p_order_type: orderType,
    p_notes: fullNotes,
    p_cart_items: cartItems
  });

  if (rpcError) {
    console.error('create_order RPC failed:', rpcError);
    // Surface a meaningful error message to the user
    const msg = rpcError.message || '';
    if (msg.includes('logged in')) throw new Error('You must be logged in to place an order.');
    if (msg.includes('not available')) throw new Error('One or more items in your cart are no longer available.');
    throw new Error('Order submission failed. Please try again.');
  }

  if (!orderData) {
    throw new Error('Order was not created. Please try again.');
  }

  // Cart clears only after confirmed success
  cart.splice(0, cart.length);
  persistCart();
  renderCart();
  if (typeof loadCustomerOrdersFromSupabase === 'function') loadCustomerOrdersFromSupabase();

  const confirmation = document.getElementById('orderConfirmation');
  const confirmationMeta = document.getElementById('confirmationMeta');
  const confirmationItems = document.getElementById('confirmationItems');

  if (confirmation && confirmationMeta && confirmationItems) {
    confirmation.classList.remove('d-none');
    confirmationMeta.innerHTML = `
      <div><span>Order</span><strong>${orderData.order_number}</strong></div>
      <div><span>Status</span><strong>${orderData.status}</strong></div>
      <div><span>Type</span><strong>${orderData.order_type}</strong></div>
      <div><span>Total</span><strong>${formatCurrency(orderData.total)}</strong></div>
    `;

    confirmationItems.innerHTML = `
      ${cartSnapshot.map((item) => `<div class="confirmation-row"><span>${item.name} x ${item.quantity}</span><strong>${formatCurrency(item.price * item.quantity)}</strong></div>`).join('')}
      <div class="confirmation-row total"><span>Total (server verified)</span><strong>${formatCurrency(orderData.total)}</strong></div>
    `;

    document.getElementById('orders')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return orderData;
}

document.addEventListener('DOMContentLoaded', function () {
  renderCart();
  hydrateCustomerOrders();

  const checkoutButton = document.getElementById('checkoutButton');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', function () {
      if (!cart.length) {
        showCartFeedback('Add a few cafe favorites before checkout.');
        return;
      }

      const cartModal = document.getElementById('cartOffcanvas');
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(cartModal);
      if (offcanvasInstance) offcanvasInstance.hide();

      const checkoutModal = document.getElementById('checkoutModal');
      const modalInstance = bootstrap.Modal.getOrCreateInstance(checkoutModal);
      modalInstance.show();
    });
  }

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
      }

      const checkoutButton = checkoutForm.querySelector('button[type="submit"]');
      if (checkoutButton) checkoutButton.disabled = true;

      const feedback = document.getElementById('checkoutFormFeedback');
      const customerName = document.getElementById('checkoutName')?.value.trim() || '';
      const phone = document.getElementById('checkoutPhone')?.value.trim() || '';
      const orderType = document.getElementById('checkoutType')?.value || 'Pickup';
      const tableInfo = document.getElementById('checkoutTable')?.value.trim() || '';
      const notes = document.getElementById('checkoutNotes')?.value.trim() || '';

      try {
        const order = await createOrderFromCart(customerName, phone, orderType, notes, tableInfo);
        if (feedback) {
          feedback.classList.remove('error');
          feedback.textContent = `Order ${order.order_number} created. Pending confirmation.`;
        }
        checkoutForm.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        if (modal) modal.hide();
      } catch (error) {
        if (feedback) {
          feedback.classList.add('error');
          feedback.textContent = error.message || 'Failed to place order. Please try again.';
        }
      } finally {
        if (checkoutButton) checkoutButton.disabled = false;
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const feedback = document.getElementById('contactFeedback');
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        if (feedback) {
          feedback.classList.add('error');
          feedback.textContent = 'Please complete all contact fields.';
        }
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (feedback) {
          feedback.classList.add('error');
          feedback.textContent = 'Please enter a valid email.';
        }
        return;
      }

      if (feedback) {
        feedback.classList.remove('error');
        feedback.textContent = 'Your message has been received. We will follow up once the backend is connected later.';
      }
      contactForm.reset();
    });
  }
});

window.cart = cart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.getCartTotal = getCartTotal;
window.persistCart = persistCart;
window.animateAddToCart = animateAddToCart;
window.persistOrders = persistOrders;
window.orderStore = orderStore;
window.createOrderFromCart = createOrderFromCart;
window.hydrateCustomerOrders = hydrateCustomerOrders;
