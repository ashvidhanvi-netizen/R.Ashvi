/**
 * AURA ROAST — Core Application Controller
 * Manages Shopping Cart State (₹), Product Filtering, Toast Notifications,
 * Modals, Mobile Menu, and LocalStorage Persistence.
 */

// ==========================================
// 1. STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
let cart = [];

try {
  const savedCart = localStorage.getItem("aura_roast_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn("Could not load cart from localStorage", e);
}

function saveCart() {
  try {
    localStorage.setItem("aura_roast_cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
}

// ==========================================
// 2. SHOPPING CART SYSTEM
// ==========================================
function addToCart(id, name, price, image, size = null) {
  // If size is provided or chosen from selector
  let chosenSize = size;
  if (!chosenSize) {
    const sizeSelector = document.getElementById(`size-${id}`);
    if (sizeSelector) {
      chosenSize = sizeSelector.value;
    }
  }

  const itemKey = chosenSize ? `${id}-${chosenSize}` : id;
  const displayName = chosenSize ? `${name} (${chosenSize})` : name;

  const existingItem = cart.find(item => item.itemKey === itemKey);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      itemKey: itemKey,
      id: id,
      name: displayName,
      price: price,
      image: image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`${displayName} added to your cart!`);

  // Open drawer if closed to give immediate visual feedback
  const drawer = document.getElementById("cart-drawer");
  if (drawer && drawer.classList.contains("translate-x-full")) {
    toggleCartDrawer();
  }
}

function updateQuantity(itemKey, delta) {
  const item = cart.find(i => i.itemKey === itemKey);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.itemKey !== itemKey);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(itemKey) {
  cart = cart.filter(i => i.itemKey !== itemKey);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart.");
}

function updateCartUI() {
  const container = document.getElementById("cart-items-container");
  const counter = document.getElementById("cart-counter");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (counter) {
    counter.innerText = totalCount;
    counter.style.display = totalCount > 0 ? "flex" : "none";
  }

  if (subtotalEl) subtotalEl.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;
  if (totalEl) totalEl.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div id="cart-empty-message" class="text-center py-16 px-4 space-y-3">
        <div class="w-16 h-16 mx-auto rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C68A4C]">
          <i data-lucide="shopping-bag" class="w-8 h-8"></i>
        </div>
        <h4 class="font-serif text-lg font-bold text-[#271711]">Your cart is empty</h4>
        <p class="text-xs text-[#7E6F66] max-w-xs mx-auto">
          Explore our handcrafted coffees, relaxing whole-leaf teas, and iced creations to begin.
        </p>
        <button onclick="toggleCartDrawer(); location.href='#shop';" 
                class="btn-caramel px-5 py-2.5 text-xs font-semibold mt-2 inline-flex items-center gap-1.5">
          <span>Explore Bestsellers</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="py-3.5 flex items-center gap-3.5 border-b border-[#4E3224]/10 last:border-b-0">
      <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover border border-[#4E3224]/10 shrink-0">
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-semibold text-[#271711] truncate">${item.name}</h4>
        <div class="text-xs text-[#C68A4C] font-semibold mt-0.5">₹${item.price} each</div>
        <div class="flex items-center gap-2.5 mt-2">
          <div class="inline-flex items-center rounded-lg border border-[#4E3224]/15 bg-[#FAF6F0] p-0.5">
            <button onclick="updateQuantity('${item.itemKey}', -1)" class="w-6 h-6 rounded-md hover:bg-white text-[#271711] flex items-center justify-center text-xs font-bold transition-colors">−</button>
            <span class="text-xs text-[#271711] font-semibold px-2.5">${item.quantity}</span>
            <button onclick="updateQuantity('${item.itemKey}', 1)" class="w-6 h-6 rounded-md hover:bg-white text-[#271711] flex items-center justify-center text-xs font-bold transition-colors">+</button>
          </div>
          <button onclick="removeFromCart('${item.itemKey}')" class="text-xs text-[#7E6F66] hover:text-red-600 transition-colors" title="Remove item">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
      <div class="text-right">
        <span class="text-sm font-bold text-[#271711] font-serif">₹${(item.price * item.quantity).toLocaleString("en-IN")}</span>
      </div>
    </div>
  `).join("");

  if (window.lucide) lucide.createIcons();
}

function toggleCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-drawer-backdrop");
  if (!drawer || !backdrop) return;

  const isOpen = !drawer.classList.contains("translate-x-full");

  if (isOpen) {
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("opacity-0", "pointer-events-none");
    backdrop.classList.remove("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "";
  } else {
    drawer.classList.remove("translate-x-full");
    backdrop.classList.remove("opacity-0", "pointer-events-none");
    backdrop.classList.add("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "hidden";
  }
}

// ==========================================
// 3. PRODUCT FILTERING (Smooth JS Transitions)
// ==========================================
function filterProducts(category, element) {
  // Update button active states
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (element) {
    element.classList.add("active");
  } else {
    // If called programmatically by category ID
    const matchBtn = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (matchBtn) matchBtn.classList.add("active");
  }

  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "flex";
      card.style.opacity = "0";
      card.style.transform = "scale(0.96)";
      setTimeout(() => {
        card.style.transition = "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 50);
    } else {
      card.style.display = "none";
    }
  });
}

function filterFromCategoryCard(category) {
  // Scroll down to shop section and apply filter
  const shopSection = document.getElementById("shop");
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: "smooth" });
  }
  setTimeout(() => {
    filterProducts(category);
  }, 400);
}

// ==========================================
// 4. TOAST NOTIFICATION SYSTEM
// ==========================================
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-enter pointer-events-auto bg-[#271711] text-[#FAF6F0] text-xs md:text-sm font-medium px-4 py-3 rounded-2xl shadow-xl border border-[#C68A4C]/30 flex items-center gap-3 max-w-sm";
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-[#C68A4C] shrink-0 animate-pulse"></span>
    <span class="flex-1">${message}</span>
    <button onclick="this.parentElement.remove()" class="text-[#FAF6F0]/60 hover:text-[#FAF6F0] ml-1">
      <i data-lucide="x" class="w-3.5 h-3.5"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove("toast-enter");
    toast.classList.add("toast-exit");
    setTimeout(() => {
      toast.remove();
    }, 280);
  }, 3500);
}

// ==========================================
// 5. CHECKOUT WORKFLOW & MODAL
// ==========================================
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your cart is currently empty.");
    return;
  }
  toggleCartDrawer();

  const backdrop = document.getElementById("checkout-modal-backdrop");
  const modalTotal = document.getElementById("modal-checkout-total");
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (modalTotal) {
    modalTotal.innerText = `₹${totalPrice.toLocaleString("en-IN")}`;
  }

  if (backdrop) {
    backdrop.classList.remove("opacity-0", "pointer-events-none");
    backdrop.classList.add("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "hidden";
  }
}

function closeCheckoutModal() {
  const backdrop = document.getElementById("checkout-modal-backdrop");
  if (backdrop) {
    backdrop.classList.add("opacity-0", "pointer-events-none");
    backdrop.classList.remove("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "";
  }
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  closeCheckoutModal();
  
  showToast("🎉 Order confirmed! Your artisan beverages are being prepared.");
  
  cart = [];
  saveCart();
  updateCartUI();
  event.target.reset();
}

// ==========================================
// 6. GENERAL UTILITIES (Menu, Newsletter)
// ==========================================
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;
  menu.classList.toggle("hidden");
}

function handleNewsletter(event) {
  event.preventDefault();
  showToast("☕ Welcome to the AURA ROAST community! Enjoy 10% off your first order.");
  event.target.reset();
}

// Sticky header styling on scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  if (!header) return;
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  if (window.lucide) {
    lucide.createIcons();
  }
});
