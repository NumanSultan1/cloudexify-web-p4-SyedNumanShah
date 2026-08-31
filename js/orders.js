const ORDER_STATUS_OPTIONS = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

async function getCurrentUserProfile(client) {
  if (!client) return null;
  const { data: { session } } = await client.auth.getSession();
  if (!session) return null;
  const { data, error } = await client
    .from('profiles')
    .select('id, full_name, phone, role')
    .eq('id', session.user.id)
    .single();
  if (error) {
    console.error('Profile fetch failed:', error.message);
    return null;
  }
  return data;
}

window.getCurrentUserProfile = getCurrentUserProfile;

function readStoredJson(key, fallback = []) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getStoredOrders() {
  return readStoredJson('brewBiteOrders', []);
}

function persistStoredOrders(orders) {
  sessionStorage.setItem('brewBiteOrders', JSON.stringify(orders));
}

function formatCurrency(value) {
  return `Rs. ${Number(value).toLocaleString('en-PK')}`;
}

function buildOrderDisplay(order) {
  const steps = ['Pending', 'Preparing', 'Ready', 'Completed'];
  const currentIndex = steps.indexOf(order.status || 'Pending');
  const statusClass = (order.status || 'Pending').toLowerCase().replace(/\s+/g, '-');
  const itemText = order.items || (order.itemLines || []).map((line) => `${line.name} x ${line.quantity}`).join(', ');

  return `
    <div class="order-card">
      <div>
        <div class="order-heading-row">
          <span class="order-status status-${statusClass}">${order.status || 'Pending'}</span>
          <h3>${order.id}</h3>
        </div>
        <div class="order-meta">
          <span>${order.date}</span>
          <span>${itemText}</span>
          <span>${formatCurrency(order.total)}</span>
        </div>
      </div>
      <div class="order-progress" aria-label="${order.status || 'Pending'} progress">
        ${steps.map((step, index) => `<span class="progress-step ${index <= currentIndex ? 'active' : ''}">${step}</span>`).join('')}
      </div>
    </div>
  `;
}

async function loadCustomerOrdersFromSupabase() {
  const customerOrders = document.getElementById('customerOrders');
  if (!customerOrders) return;

  const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
  if (!client) {
    const orders = getStoredOrders();
    customerOrders.innerHTML = orders.length
      ? orders.slice().reverse().map((order) => buildOrderDisplay(order)).join('')
      : '<div class="empty-state">No orders yet. Your next brew and bite will appear here.</div>';
    return;
  }

  const { data: { session }, error: sessionError } = await client.auth.getSession();
  if (sessionError || !session) {
    customerOrders.innerHTML = '<div class="empty-state">Log in to view your orders.</div>';
    return;
  }

  const { data: orders, error } = await client
    .from('orders')
    .select('*')
    .eq('customer_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Customer orders load failed:', error.message);
    customerOrders.innerHTML = '<div class="empty-state">Unable to load orders right now.</div>';
    return;
  }

  if (!orders.length) {
    customerOrders.innerHTML = '<div class="empty-state">No orders yet. Your next brew and bite will appear here.</div>';
    return;
  }

  const orderIds = orders.map((order) => order.id);
  const { data: orderItems, error: itemError } = orderIds.length
    ? await client.from('order_items').select('*').in('order_id', orderIds)
    : { data: [], error: null };

  if (itemError) {
    console.error('Order item lookup failed:', itemError.message);
  }

  const itemMap = new Map();
  (orderItems || []).forEach((item) => {
    if (!itemMap.has(item.order_id)) itemMap.set(item.order_id, []);
    itemMap.get(item.order_id).push(item);
  });

  customerOrders.innerHTML = orders
    .map((order) => {
      const itemText = (itemMap.get(order.id) || []).map((line) => `${line.product_name} x ${line.quantity}`).join(', ') || 'No items';
      const orderRecord = {
        id: order.order_number || `#${order.id}`,
        date: new Date(order.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: order.status,
        total: Number(order.total || 0),
        items: itemText,
        itemLines: (itemMap.get(order.id) || []).map((line) => ({ name: line.product_name, quantity: Number(line.quantity) }))
      };
      return buildOrderDisplay(orderRecord);
    })
    .join('');
}

async function renderAdminOrders() {
  const adminOrdersTable = document.getElementById('adminOrdersTable');
  if (!adminOrdersTable) return;

  const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
  if (!client) {
    const storedOrders = getStoredOrders();
    if (!storedOrders.length) {
      adminOrdersTable.innerHTML = '<tr><td colspan="6"><div class="empty-state">No orders yet.</div></td></tr>';
      return;
    }

    adminOrdersTable.innerHTML = storedOrders
      .slice()
      .reverse()
      .map(
        (order) => `
          <tr>
            <td>#${order.id}</td>
            <td>${order.customer}<br><small>${order.phone}</small></td>
            <td>${order.items || (order.itemLines || []).map((line) => `${line.name} x ${line.quantity}`).join(', ')}</td>
            <td>${formatCurrency(order.total)}</td>
            <td>${order.date}</td>
            <td>
              <select class="status-select" data-order-id="${order.id}" aria-label="Update status for ${order.id}">
                ${ORDER_STATUS_OPTIONS.map((status) => `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}
              </select>
            </td>
          </tr>
        `
      )
      .join('');
    return;
  }

  const { data: { session }, error: sessionError } = await client.auth.getSession();
  if (sessionError || !session) {
    adminOrdersTable.innerHTML = '<tr><td colspan="6"><div class="empty-state">Please sign in as an admin.</div></td></tr>';
    return;
  }

  const profile = typeof window.getCurrentUserProfile === 'function' ? await window.getCurrentUserProfile(client) : null;
  if (!profile || profile.role !== 'admin') {
    adminOrdersTable.innerHTML = '<tr><td colspan="6"><div class="empty-state">Admin access required.</div></td></tr>';
    return;
  }

  const { data: orders, error } = await client.from('orders').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error('Admin order lookup failed:', error.message);
    adminOrdersTable.innerHTML = '<tr><td colspan="6"><div class="empty-state">Unable to load orders.</div></td></tr>';
    return;
  }

  const orderIds = orders.map((order) => order.id);
  const { data: orderItems, error: itemError } = orderIds.length
    ? await client.from('order_items').select('*').in('order_id', orderIds)
    : { data: [], error: null };

  if (itemError) {
    console.error('Admin order item lookup failed:', itemError.message);
  }

  const itemMap = new Map();
  (orderItems || []).forEach((line) => {
    if (!itemMap.has(line.order_id)) itemMap.set(line.order_id, []);
    itemMap.get(line.order_id).push(line);
  });

  adminOrdersTable.innerHTML = orders
    .map((order) => {
      const itemText = (itemMap.get(order.id) || []).map((line) => `${line.product_name} x ${line.quantity}`).join(', ') || 'No items';
      return `
        <tr>
          <td>#${order.order_number || order.id}</td>
          <td>${order.customer_name}<br><small>${order.phone}</small></td>
          <td>${itemText}</td>
          <td>${formatCurrency(order.total || 0)}</td>
          <td>${new Date(order.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
          <td>
            <select class="status-select" data-order-id="${order.id}" aria-label="Update status for ${order.order_number || order.id}">
              ${ORDER_STATUS_OPTIONS.map((status) => `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}
            </select>
          </td>
        </tr>
      `;
    })
    .join('');

  adminOrdersTable.querySelectorAll('.status-select').forEach((select) => {
    select.addEventListener('change', async function () {
      const nextStatus = this.value;
      const orderId = Number(this.dataset.orderId);
      const { error } = await client.from('orders').update({ status: nextStatus }).eq('id', orderId);
      if (error) {
        console.error('Status update failed:', error.message);
        return;
      }
      renderAdminOrders();
    });
  });
}

let realtimeOrdersChannel = null;

function setupRealtimeOrders() {
  const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
  if (!client) return;

  // Prevent duplicate subscriptions
  if (realtimeOrdersChannel) return;

  realtimeOrdersChannel = client
    .channel('brew-bite-orders')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
      console.log('Realtime: new order', payload.new.order_number);
      if (document.getElementById('adminOrdersTable')) {
        renderAdminOrders();
      }
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
      console.log('Realtime: order updated', payload.new.order_number, '->', payload.new.status);
      if (document.getElementById('adminOrdersTable')) {
        renderAdminOrders();
      }
      if (document.getElementById('customerOrders')) {
        loadCustomerOrdersFromSupabase();
      }
    })
    .subscribe((status) => {
      console.log('Realtime subscription status:', status);
    });
}

if (document.getElementById('customerOrders')) {
  loadCustomerOrdersFromSupabase();
  setupRealtimeOrders();
}

if (document.getElementById('adminOrdersTable')) {
  renderAdminOrders();
  setupRealtimeOrders();
}

window.getStoredOrders = getStoredOrders;
window.persistStoredOrders = persistStoredOrders;
window.renderAdminOrders = renderAdminOrders;
window.loadCustomerOrdersFromSupabase = loadCustomerOrdersFromSupabase;
window.setupRealtimeOrders = setupRealtimeOrders;
