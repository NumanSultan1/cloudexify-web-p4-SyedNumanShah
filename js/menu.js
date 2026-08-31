const menuItems = [
  { id: 1, name: 'Cappuccino', description: 'Silky espresso with dense microfoam and a toasted nut finish.', price: 450, category: 'Coffee', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 2, name: 'Caramel Latte', description: 'Espresso, steamed milk, and buttery caramel warmth.', price: 480, category: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 3, name: 'Vanilla Latte', description: 'Velvety vanilla bean sweetness layered into smooth espresso.', price: 470, category: 'Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 4, name: 'Spanish Latte', description: 'A rich, lightly sweet Spanish-inspired café classic.', price: 490, category: 'Coffee', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 5, name: 'Mocha', description: 'Dark chocolate notes with espresso and creamy milk.', price: 500, category: 'Coffee', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 6, name: 'Americano', description: 'Balanced espresso shots with hot water and a clean finish.', price: 380, category: 'Coffee', image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 7, name: 'Espresso', description: 'A short, bold shot with dark chocolate depth.', price: 300, category: 'Coffee', image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 8, name: 'Flat White', description: 'Micro-foamed milk and espresso with a silky finish.', price: 420, category: 'Coffee', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 9, name: 'Hazelnut Latte', description: 'Nutty, aromatic espresso with creamy hazelnut sweetness.', price: 490, category: 'Coffee', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 10, name: 'Pistachio Latte', description: 'Light pistachio cream, espresso, and gentle vanilla warmth.', price: 520, category: 'Coffee', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 11, name: 'Kashmiri Chai', description: 'Pink Kashmiri tea with rich spice and a creamy finish.', price: 360, category: 'Tea', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 12, name: 'Masala Chai', description: 'Classic spiced tea with ginger, cardamom, and milk.', price: 320, category: 'Tea', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 13, name: 'Green Tea', description: 'Fresh and fragrant with a light, mellow finish.', price: 280, category: 'Tea', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 14, name: 'Lemon Ginger Tea', description: 'Citrusy, zesty tea with a warming ginger kick.', price: 310, category: 'Tea', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 15, name: 'Honey Tea', description: 'A gentle infusion sweetened with floral honey.', price: 290, category: 'Tea', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 16, name: 'Black Tea', description: 'Strong, comforting tea made for slow sipping.', price: 260, category: 'Tea', image: 'https://images.unsplash.com/photo-1514846312329-b0a2d8f6fd95?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 17, name: 'Chocolate Croissant', description: 'Flaky pastry filled with rich dark chocolate.', price: 420, category: 'Pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 18, name: 'Almond Croissant', description: 'Buttery layers with toasted almond filling.', price: 430, category: 'Pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 19, name: 'Butter Croissant', description: 'Golden, flaky, and perfectly buttery.', price: 380, category: 'Pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 20, name: 'Blueberry Muffin', description: 'Moist and tender with bursts of juicy berries.', price: 350, category: 'Pastries', image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 21, name: 'Chocolate Danish', description: 'Custardy center with a glossy cocoa finish.', price: 390, category: 'Pastries', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 22, name: 'Cinnamon Roll', description: 'Soft swirl with warm spice and cream glaze.', price: 410, category: 'Pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 23, name: 'Classic Pancakes', description: 'Stacked pancakes with maple drizzle and whipped cream.', price: 520, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 24, name: 'French Toast', description: 'Golden brioche with berry compote and vanilla cream.', price: 560, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 25, name: 'Egg & Cheese Croissant', description: 'Buttery croissant stuffed with eggs and melted cheese.', price: 480, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 26, name: 'Breakfast Sandwich', description: 'Egg, cheddar, sauteed greens, and herb aioli on brioche.', price: 540, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 27, name: 'Avocado Toast', description: 'Sourdough toast with avocado, chili, and fresh lemon.', price: 470, category: 'Sandwiches', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 28, name: 'Breakfast Bowl', description: 'Greek yogurt, granola, berries, and pistachios.', price: 520, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 29, name: 'Oatmeal Delight', description: 'Creamy oats topped with banana, almonds, and cinnamon.', price: 430, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 30, name: 'Chocolate Cake', description: 'Moist layered cake with bittersweet ganache.', price: 620, category: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 31, name: 'Brownie', description: 'Dense, fudgy chocolate square with a crisp edge.', price: 390, category: 'Cakes', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 32, name: 'Cheesecake', description: 'Creamy vanilla cheesecake with berry glaze.', price: 560, category: 'Cakes', image: 'https://images.unsplash.com/photo-1533134242443-d6cfd45a609e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 33, name: 'Tiramisu', description: 'Espresso-soaked layers with mascarpone cream.', price: 600, category: 'Cakes', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 34, name: 'Chocolate Tart', description: 'Silky dark chocolate filling in a crisp shell.', price: 610, category: 'Cakes', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 35, name: 'Walnut Date Slice', description: 'Soft crumb with dates, walnuts, and sweet spice.', price: 450, category: 'Cakes', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 36, name: 'Berry Cheesecake', description: 'Fresh berry topping over smooth vanilla cheesecake.', price: 580, category: 'Cakes', image: 'https://images.unsplash.com/photo-1533134242443-d6cfd45a609e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 37, name: 'Iced Latte', description: 'Chilled espresso with velvety milk over ice.', price: 440, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 38, name: 'Iced Mocha', description: 'Cold coffee with cocoa and sweet espresso notes.', price: 470, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 39, name: 'Cold Coffee', description: 'Smooth, chilled coffee with a mellow roasted finish.', price: 430, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 40, name: 'Mango Cooler', description: 'Refreshing mango and citrus cooler with a citrus lift.', price: 420, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 41, name: 'Lemon Mint', description: 'Fresh lemon and mint with a crisp cooling finish.', price: 360, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3f0b?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 42, name: 'Iced Hibiscus', description: 'Tangy floral refreshment with a sweet finish.', price: 350, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1464226184884-fa52ac9d3d98?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 43, name: 'Deolai Special Latte', description: 'Our signature house latte with saffron warmth.', price: 580, category: 'Specials', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 44, name: 'Swat Mountain Mocha', description: 'Dark chocolate mocha with a mountain-breeze finish.', price: 620, category: 'Specials', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 45, name: 'Brew & Bite Signature', description: 'House blend with saffron cream and caramel depth.', price: 650, category: 'Specials', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 46, name: 'Cloud Cream Latte', description: 'Creamy, airy latte finished with soft vanilla foam.', price: 560, category: 'Specials', image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 47, name: 'Cocoa Cream Cold Brew', description: 'Cold brew with cocoa cream sweeps and smooth finish.', price: 540, category: 'Specials', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 48, name: 'Mountain Oat Latte', description: 'Creamy oat milk layered with confident espresso notes.', price: 500, category: 'Specials', image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 49, name: 'Cardamom Cold Brew', description: 'Bright cold brew infused with cardamom and orange peel.', price: 520, category: 'Specials', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 50, name: 'Cinnamon Maple Latte', description: 'Maple, cinnamon, and espresso layered in smooth milk.', price: 530, category: 'Specials', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 51, name: 'Berry Yogurt Parfait', description: 'Layered yogurt with berries, granola, and honey drizzle.', price: 470, category: 'Breakfast', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 52, name: 'Saffron Bun', description: 'Soft bun with saffron aroma and a delicate glaze.', price: 340, category: 'Pastries', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 53, name: 'Mini Cheeseboard Tart', description: 'Buttery crust with tangy cream and berry topping.', price: 430, category: 'Pastries', image: 'https://images.unsplash.com/photo-1533134242443-d6cfd45a609e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 54, name: 'Hazelnut Muffin', description: 'Moist and nutty with a soft caramelized finish.', price: 360, category: 'Pastries', image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 55, name: 'Walnut Loaf', description: 'Tender loaf with roasted walnuts and a caramel finish.', price: 380, category: 'Pastries', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 56, name: "S'mores Croissant", description: 'Toasted marshmallow-like sweetness with cocoa notes.', price: 450, category: 'Pastries', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 57, name: 'Baked Cheesecake Bites', description: 'Mini bites with velvety cream and a buttery crust.', price: 420, category: 'Desserts', image: 'https://images.unsplash.com/photo-1533134242443-d6cfd45a609e?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 58, name: 'Cookie Stack', description: 'Chocolate chip cookies baked golden and crisp.', price: 390, category: 'Desserts', image: 'https://images.unsplash.com/photo-1499636136210-6d10c13e3122?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 59, name: 'Banoffee Tart', description: 'Buttery crust with caramel, banana, and cream.', price: 600, category: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 60, name: 'Dark Chocolate Cookie', description: 'Rich cookie with toasted cacao and soft center.', price: 350, category: 'Desserts', image: 'https://images.unsplash.com/photo-1499636136210-6d10c13e3122?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 61, name: 'Mango Lassi Cooler', description: 'Creamy yogurt blend with mango and a cooling finish.', price: 410, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80', availability: true },
  { id: 62, name: 'Strawberry Basil Spritz', description: 'Sparkling strawberry and basil refreshment.', price: 370, category: 'Cold Drinks', image: 'https://images.unsplash.com/photo-1464226184884-fa52ac9d3d98?auto=format&fit=crop&w=800&q=80', availability: true }
];

const categoryNames = ['All', 'Coffee', 'Tea', 'Cold Drinks', 'Breakfast', 'Pastries', 'Cakes', 'Sandwiches', 'Desserts', 'Specials'];

function formatCurrency(value) {
  return `Rs. ${Number(value).toLocaleString('en-PK')}`;
}

const featuredItems = [menuItems[1], menuItems[10], menuItems[17], menuItems[23], menuItems[30], menuItems[42]].filter(Boolean);
let isFullMenuVisible = false;

function renderFeaturedItems() {
  const featuredGrid = document.getElementById('featuredGrid');
  if (!featuredGrid) return;

  featuredGrid.innerHTML = featuredItems
    .map(
      (item) => `
        <article class="featured-card">
          <img src="${item.image}" alt="${item.name}" />
          <div class="featured-content">
            <div class="featured-meta">
              <span>${item.category}</span>
              <span>${formatCurrency(item.price)}</span>
            </div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button class="btn btn-primary add-to-cart-btn" type="button" data-item-id="${item.id}" data-image="${item.image}">
              Add to Cart
            </button>
          </div>
        </article>
      `
    )
    .join('');

  bindAddToCartButtons(featuredGrid);
}

function renderMenuItems(items, { showFeaturedOnly = false } = {}) {
  const menuGrid = document.getElementById('menuGrid');
  if (!menuGrid) return;

  const displayItems = showFeaturedOnly ? menuItems.slice(0, 12) : items;

  if (!displayItems.length) {
    menuGrid.innerHTML = '<div class="col-12"><div class="empty-state">No items match your search.</div></div>';
    return;
  }

  menuGrid.innerHTML = displayItems
    .map(
      (item) => `
        <article class="menu-card scroll-reveal">
          <div class="menu-card-image-wrap">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="menu-card-body">
            <div class="menu-card-top">
              <h3>${item.name}</h3>
              <span class="item-price">${formatCurrency(item.price)}</span>
            </div>
            <span class="item-category">${item.category}</span>
            <p class="item-description">${item.description}</p>
            <button class="btn btn-primary add-to-cart-btn" type="button" data-item-id="${item.id}" data-image="${item.image}">
              Add to Cart
            </button>
          </div>
        </article>
      `
    )
    .join('');

  bindAddToCartButtons(menuGrid);
  observeScrollReveals(menuGrid);
}

function bindAddToCartButtons(scope = document) {
  scope.querySelectorAll('.add-to-cart-btn').forEach((button) => {
    button.addEventListener('click', function () {
      const itemId = Number(this.dataset.itemId);
      if (typeof animateAddToCart === 'function') {
        animateAddToCart(this, this.dataset.image);
      }
      addToCart(itemId);
    });
  });
}

function attachMenuFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('menuSearch');

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const category = this.dataset.category;
        const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';
        filterButtons.forEach((btn) => btn.classList.toggle('active', btn === this));
        applyMenuFilters(category, searchValue);
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'All';
      const searchValue = this.value.trim().toLowerCase();
      applyMenuFilters(activeCategory, searchValue);
    });
  }
}

function applyMenuFilters(category, searchValue) {
  isFullMenuVisible = true;
  const viewMenuToggle = document.getElementById('viewMenuToggle');
  if (viewMenuToggle) viewMenuToggle.textContent = 'Showing Full Menu';

  const normalizedCategory = category || 'All';
  const sourceItems = window.menuItems && window.menuItems.length ? window.menuItems : menuItems;
  const filteredItems = sourceItems.filter((item) => {
    const matchesCategory = normalizedCategory === 'All' || item.category === normalizedCategory;
    const matchesSearch = !searchValue || item.name.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue);
    return matchesCategory && matchesSearch;
  });

  renderMenuItems(filteredItems);
}

function setFeaturedMenuState() {
  const menuGrid = document.getElementById('menuGrid');
  if (!menuGrid) return;
  isFullMenuVisible = false;
  const sourceItems = window.menuItems && window.menuItems.length ? window.menuItems : menuItems;
  renderMenuItems(sourceItems, { showFeaturedOnly: true });
}

function observeScrollReveals(scope = document) {
  const targets = scope.querySelectorAll('.scroll-reveal:not(.visible)');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  targets.forEach((target) => observer.observe(target));
}

async function hydrateMenuFromSupabase() {
  const client = typeof window.getSupabaseClient === 'function' ? window.getSupabaseClient() : null;
  if (!client) return;

  const { data, error } = await client.from('menu_items').select('*').eq('available', true).order('id', { ascending: true });
  if (error) {
    console.warn('Menu sync from Supabase failed:', error.message);
    return;
  }

  if (!data || !data.length) return;

  const normalized = data.map((item) => ({
    id: Number(item.id),
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: item.category,
    image: item.image_url || item.image,
    availability: Boolean(item.available)
  }));

  window.menuItems = normalized;
  renderFeaturedItems();
  const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'All';
  const searchValue = document.getElementById('menuSearch')?.value.trim().toLowerCase() || '';
  applyMenuFilters(activeCategory, searchValue);
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedItems();
  observeScrollReveals();
  hydrateMenuFromSupabase();
});

if (document.getElementById('menuGrid')) {
  setFeaturedMenuState();
  attachMenuFilters();

  const viewMenuToggle = document.getElementById('viewMenuToggle');
  if (viewMenuToggle) {
    viewMenuToggle.addEventListener('click', function () {
      const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'All';
      const searchValue = document.getElementById('menuSearch')?.value.trim().toLowerCase() || '';
      isFullMenuVisible = true;
      this.textContent = 'Showing Full Menu';
      applyMenuFilters(activeCategory, searchValue);
    });
  }
}

window.menuItems = menuItems;
window.categoryNames = categoryNames;
window.featuredItems = featuredItems;
window.hydrateMenuFromSupabase = hydrateMenuFromSupabase;
