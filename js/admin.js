// Admin dashboard prototype for frontend-only menu and order management.
const adminMenuItems = [
  {
    id: 1,
    name: 'Deolai Special Latte',
    description: 'House espresso with saffron warmth and velvet milk.',
    price: 580,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 2,
    name: 'Honey Almond Croissant',
    description: 'Buttery laminated pastry with almond cream and honey.',
    price: 430,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 3,
    name: 'Avocado Toast',
    description: 'Sourdough with smashed avocado, chili flakes, and lemon.',
    price: 470,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 4,
    name: 'Berry Cheesecake Slice',
    description: 'Creamy cheesecake atop a graham crust with berry compote.',
    price: 580,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d6cfd45a609e?auto=format&fit=crop&w=800&q=80',
    available: false
  }
];

function renderAdminStats() {
  const statTotalOrders = document.getElementById('statTotalOrders');
  const statRevenue = document.getElementById('statRevenue');
  const statPendingOrders = document.getElementById('statPendingOrders');
  const statMenuItems = document.getElementById('statMenuItems');

  if (!statTotalOrders || !statRevenue || !statPendingOrders || !statMenuItems) return;

  statTotalOrders.textContent = '128';
  statRevenue.textContent = 'Rs. 74,850';
  statPendingOrders.textContent = '14';
  statMenuItems.textContent = String(adminMenuItems.length);
}

function renderAdminMenuTable() {
  const adminMenuTable = document.getElementById('adminMenuTable');
  if (!adminMenuTable) return;

  adminMenuTable.innerHTML = adminMenuItems
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>${formatCurrency(item.price)}</td>
          <td>${item.category}</td>
          <td><img src="${item.image}" alt="${item.name}" class="admin-item-image" /></td>
          <td>${item.available ? 'Available' : 'Hidden'}</td>
          <td>
            <div class="table-actions">
              <button class="icon-btn" type="button" data-action="edit" data-id="${item.id}">Edit</button>
              <button class="icon-btn" type="button" data-action="delete" data-id="${item.id}">Delete</button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');

  adminMenuTable.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', function () {
      const itemId = Number(this.dataset.id);
      const menuItem = adminMenuItems.find((item) => item.id === itemId);
      if (!menuItem) return;

      document.getElementById('menuName').value = menuItem.name;
      document.getElementById('menuDescription').value = menuItem.description;
      document.getElementById('menuPrice').value = menuItem.price;
      document.getElementById('menuCategory').value = menuItem.category;
      document.getElementById('menuImage').value = menuItem.image;
      document.getElementById('menuAvailability').checked = menuItem.available;
      document.getElementById('menuForm').dataset.editingId = String(menuItem.id);

      const modal = new bootstrap.Modal(document.getElementById('menuModal'));
      modal.show();
    });
  });

  adminMenuTable.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', function () {
      const itemId = Number(this.dataset.id);
      const index = adminMenuItems.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        adminMenuItems.splice(index, 1);
        renderAdminMenuTable();
      }
    });
  });
}

function attachMenuForm() {
  const menuForm = document.getElementById('menuForm');
  if (!menuForm) return;

  menuForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const menuFormFeedback = document.getElementById('menuFormFeedback');

    const formData = {
      id: Number(menuForm.dataset.editingId) || Date.now(),
      name: document.getElementById('menuName').value.trim(),
      description: document.getElementById('menuDescription').value.trim(),
      price: Number(document.getElementById('menuPrice').value),
      category: document.getElementById('menuCategory').value,
      image: document.getElementById('menuImage').value.trim(),
      available: document.getElementById('menuAvailability').checked
    };

    if (!formData.name || !formData.description || !formData.image || !formData.price) {
      if (menuFormFeedback) {
        menuFormFeedback.classList.add('error');
        menuFormFeedback.textContent = 'Please fill out all fields before saving the menu item.';
      }
      return;
    }

    const existingIndex = adminMenuItems.findIndex((item) => item.id === formData.id);
    if (existingIndex >= 0) {
      adminMenuItems[existingIndex] = formData;
    } else {
      adminMenuItems.push(formData);
    }

    renderAdminMenuTable();
    menuForm.reset();
    delete menuForm.dataset.editingId;
    if (menuFormFeedback) {
      menuFormFeedback.classList.remove('error');
      menuFormFeedback.textContent = 'Menu item saved.';
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('menuModal'));
    if (modal) modal.hide();
  });
}

function formatCurrency(value) {
  return `Rs. ${Number(value).toLocaleString('en-PK')}`;
}

document.addEventListener('DOMContentLoaded', function () {
  renderAdminStats();
  renderAdminMenuTable();
  attachMenuForm();
});

window.adminMenuItems = adminMenuItems;
