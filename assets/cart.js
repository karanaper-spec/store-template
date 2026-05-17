// ── Cart state (localStorage) ──────────────────────────────────────
const CART_KEY = 'peptidepro_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(product) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === product.id);
  if (idx > -1) cart[idx].qty += 1;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  showToast(product.name + ' added to cart', product.amount + ' · ' + product.purity + ' purity');
}
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  if (typeof renderCart === 'function') renderCart();
}
function updateQty(id, qty) {
  if (qty <= 0) { removeFromCart(id); return; }
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx > -1) { cart[idx].qty = qty; saveCart(cart); }
  if (typeof renderCart === 'function') renderCart();
}
function clearCart() { saveCart([]); }

function updateCartBadge() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.classList.toggle('visible', total > 0);
  });
}

// ── Toast ──────────────────────────────────────────────────────────
function showToast(title, sub) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div>${title}</div>${sub ? `<div class="toast-sub">${sub}</div>` : ''}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ── Scroll to section ─────────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ── FAQ accordion ─────────────────────────────────────────────────
function initFaq() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('open'));
      if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
    });
  });
}

// ── Mobile menu ───────────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}

// ── Cart page renderer ────────────────────────────────────────────
function renderCart() {
  const cart = getCart();
  const cartContent = document.getElementById('cart-content');
  const cartEmpty = document.getElementById('cart-empty');
  if (!cartContent) return;

  if (cart.length === 0) {
    cartContent.style.display = 'none';
    if (cartEmpty) cartEmpty.style.display = 'flex';
    return;
  }
  cartContent.style.display = 'grid';
  if (cartEmpty) cartEmpty.style.display = 'none';

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 150 ? 0 : 12.95;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  // count
  const countEl = document.getElementById('cart-item-count');
  if (countEl) countEl.textContent = totalItems + ' item' + (totalItems !== 1 ? 's' : '');

  // items
  const itemsEl = document.getElementById('cart-items');
  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-info">
          <div class="cart-item-img"><img src="images/${item.image}" alt="${item.name}"></div>
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-sub">${item.fullName} &middot; ${item.amount} &middot; ${item.purity}</div>
          </div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty('${item.id}', ${item.qty - 1})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', ${item.qty + 1})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <div class="cart-unit-price">$${item.price}.00</div>
        <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
        </button>
      </div>
    `).join('');
  }

  // shipping notice
  const noticeEl = document.getElementById('shipping-notice');
  if (noticeEl) {
    if (subtotal >= 150) {
      noticeEl.className = 'shipping-notice notice-free';
      noticeEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Free shipping applied to your order.`;
    } else {
      noticeEl.className = 'shipping-notice notice-add';
      noticeEl.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> Add <strong>$${(150 - subtotal).toFixed(2)}</strong> more for free shipping.`;
    }
  }

  // summary
  const subEl = document.getElementById('summary-subtotal');
  const shipEl = document.getElementById('summary-shipping');
  const totEl = document.getElementById('summary-total');
  if (subEl) subEl.textContent = '$' + subtotal.toFixed(2);
  if (shipEl) shipEl.innerHTML = shipping === 0 ? '<span class="free-ship">Free</span>' : '$' + shipping.toFixed(2);
  if (totEl) totEl.textContent = '$' + total.toFixed(2);
}

function handleCheckout() {
  clearCart();
  showToast('Order submitted', 'A confirmation will be sent to your email.');
  setTimeout(() => { window.location.href = 'index.html'; }, 1500);
}

// ── Init ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initFaq();
  initMobileMenu();
  if (typeof renderCart === 'function') renderCart();
});
