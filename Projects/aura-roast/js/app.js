/**
 * AURA ROAST — Core Application Controller
 * Manages Shopping Cart State (₹), Smooth Category Navigation & Filtering,
 * Toast Notifications, Modals, Mobile Menu, and LocalStorage Persistence.
 */

// ==========================================
// 1. STATE MANAGEMENT & LOCAL STORAGE
// ==========================================
let cart = [];
let appliedOffer = null; // e.g. { code: 'AURA50', percent: 50, desc: '50% First Order' }

try {
  const savedCart = localStorage.getItem("aura_roast_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  const savedOffer = localStorage.getItem("aura_roast_offer");
  if (savedOffer) {
    appliedOffer = JSON.parse(savedOffer);
  }
} catch (e) {
  console.warn("Could not load cart from localStorage", e);
}

function saveCart() {
  try {
    localStorage.setItem("aura_roast_cart", JSON.stringify(cart));
    if (appliedOffer) {
      localStorage.setItem("aura_roast_offer", JSON.stringify(appliedOffer));
    } else {
      localStorage.removeItem("aura_roast_offer");
    }
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
}

// ==========================================
// 2. CATEGORY NAVIGATION & PRODUCT FILTERING
// ==========================================

/**
 * Navigates smoothly to the shop section and immediately applies the category filter.
 * Used by Header Nav Links, Category Cards, and Mobile Menu Links.
 * @param {string} category - 'all' | 'coffee' | 'tea' | 'iced'
 * @param {Event} [event] - Optional click event to prevent default jump
 */
function navigateToCategory(category, event) {
  if (event) {
    event.preventDefault();
  }

  // 1. Apply category filter immediately
  filterProducts(category);

  // 2. Smoothly scroll to the shop section
  const shopSection = document.getElementById("shop");
  if (shopSection) {
    const headerOffset = 80;
    const elementPosition = shopSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  // 3. Update active state on navigation links
  document.querySelectorAll(".nav-link-custom").forEach(link => {
    link.classList.remove("active");
  });

  const activeNavLink = document.querySelector(`.nav-link-custom[data-nav="${category}"]`);
  if (activeNavLink) {
    activeNavLink.classList.add("active");
  }
}

/**
 * Filters products in the shop section by category.
 * Shows only the selected category or all products.
 * @param {string} category - 'all' | 'coffee' | 'tea' | 'iced'
 * @param {HTMLElement} [buttonEl] - The filter button clicked (if triggered by tab)
 */
function filterProducts(category, buttonEl) {
  // 1. Update active states on filter tab buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  if (buttonEl) {
    buttonEl.classList.add("active");
  } else {
    const matchBtn = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (matchBtn) {
      matchBtn.classList.add("active");
    }
  }

  // 2. Target ONLY the product cards inside the Bestsellers grid (#products-grid)
  const cards = document.querySelectorAll("#products-grid .product-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "flex";
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
      visibleCount++;
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
      card.style.transform = "scale(0.96)";
    }
  });

  // 3. Update category status indicator badge in shop section
  const statusBadge = document.getElementById("shop-category-status");
  if (statusBadge) {
    const titles = {
      all: "Showing All Handcrafted Drinks (24 Bestsellers)",
      coffee: "Showing Coffee Selection (Espresso, Americano, Cappuccino, Flat White, Cortado & Lattes)",
      tea: "Showing Tea Selection (Masala Chai, Adrak Chai, Dubai Karak, Himalayan Green & Herbal Teas)",
      iced: "Showing Iced Refreshers (18h Cold Brew, Iced Lattes, Fruit Sparklers & Coolers)"
    };
    statusBadge.innerText = titles[category] || `Showing ${category}`;
  }
}

// ==========================================
// 3. SHOPPING CART SYSTEM
// ==========================================
function addToCart(id, name, price, image, size = null) {
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
  showToast(`☕ ${displayName} added to your cart for ₹${price}!`);

  // Open drawer if closed to give immediate visual confirmation
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

/**
 * 1-Click Offer Claiming & Coupon Activation
 */
function claimOffer(code, percent, description) {
  appliedOffer = {
    code: code,
    percent: percent,
    desc: description
  };
  saveCart();
  updateCartUI();
  showToast(`🎉 Offer "${code}" Claimed! ${percent}% discount added to your cart!`);

  const drawer = document.getElementById("cart-drawer");
  if (drawer && drawer.classList.contains("translate-x-full")) {
    toggleCartDrawer();
  }
}

/**
 * 1-Click Add Combo Deal directly to cart
 */
function addOneClickDeal(id, name, price, image) {
  addToCart(id, name, price, image);
  showToast(`🔥 Special 1-Click Offer Added: ${name} @ ₹${price}!`);
}

function removeOffer() {
  appliedOffer = null;
  saveCart();
  updateCartUI();
  showToast("Coupon removed.");
}

function updateCartUI() {
  const container = document.getElementById("cart-items-container");
  const counter = document.getElementById("cart-counter");
  const subtotalEl = document.getElementById("cart-subtotal");
  const discountRow = document.getElementById("cart-discount-row");
  const discountEl = document.getElementById("cart-discount");
  const discountLabel = document.getElementById("cart-discount-label");
  const deliveryEl = document.getElementById("cart-delivery");
  const totalEl = document.getElementById("cart-total");

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let discountAmount = 0;
  if (appliedOffer && subtotalPrice > 0) {
    discountAmount = Math.round(subtotalPrice * (appliedOffer.percent / 100));
  }

  const finalTotal = Math.max(0, subtotalPrice - discountAmount);

  if (counter) {
    counter.innerText = totalCount;
    counter.style.display = totalCount > 0 ? "flex" : "none";
  }

  if (subtotalEl) subtotalEl.innerText = `₹${subtotalPrice.toLocaleString("en-IN")}`;

  if (discountRow) {
    if (discountAmount > 0) {
      discountRow.style.display = "flex";
      if (discountEl) discountEl.innerText = `-₹${discountAmount.toLocaleString("en-IN")}`;
      if (discountLabel) discountLabel.innerText = `Offer (${appliedOffer.code} - ${appliedOffer.percent}% OFF)`;
    } else {
      discountRow.style.display = "none";
    }
  }

  if (deliveryEl) {
    if (finalTotal >= 299 || finalTotal === 0) {
      deliveryEl.innerHTML = `<span class="text-[#4E6E58] font-semibold">FREE (Orders > ₹299)</span>`;
    } else {
      deliveryEl.innerHTML = `<span class="text-[#7E6F66]">₹69 (Add ₹${299 - finalTotal} for Free Delivery)</span>`;
    }
  }

  if (totalEl) totalEl.innerText = `₹${finalTotal.toLocaleString("en-IN")}`;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div id="cart-empty-message" class="text-center py-16 px-4 space-y-3">
        <div class="w-16 h-16 mx-auto rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#C68A4C]">
          <i data-lucide="shopping-bag" class="w-8 h-8"></i>
        </div>
        <h4 class="font-serif text-lg font-bold text-[#271711]">Your cart is empty</h4>
        <p class="text-xs text-[#7E6F66] max-w-xs mx-auto">
          Explore our handcrafted coffees (from ₹99), mountain teas (from ₹79), and chilled refreshers!
        </p>
        <button onclick="toggleCartDrawer(); navigateToCategory('all');" 
                class="btn-caramel px-5 py-2.5 text-xs font-semibold mt-2 inline-flex items-center gap-1.5">
          <span>Explore Sips</span>
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
// 5. CHECKOUT WORKFLOW & ORDER SUCCESS MODAL
// ==========================================
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Your cart is currently empty.");
    return;
  }
  toggleCartDrawer();

  const backdrop = document.getElementById("checkout-modal-backdrop");
  const modalTotal = document.getElementById("modal-checkout-total");
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedOffer ? Math.round(subtotal * (appliedOffer.percent / 100)) : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  if (modalTotal) {
    modalTotal.innerText = `₹${finalTotal.toLocaleString("en-IN")}${discount > 0 ? ` (Saved ₹${discount} with ${appliedOffer.code}!)` : ""}`;
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

/**
 * Real Order Placement: Creates Live Order Confirmation & Express Tracking Modal
 */
function handleCheckoutSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const nameInput = form.querySelector('input[placeholder*="Ashvi"], input[type="text"]');
  const phoneInput = form.querySelector('input[type="tel"]');
  const addressInput = form.querySelector('textarea');
  
  const customerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Beverage Lover";
  const customerPhone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : "+91 98765 43210";
  const customerAddress = addressInput && addressInput.value.trim() ? addressInput.value.trim() : "Express Delivery Location";

  const orderId = "AR-" + Math.floor(100000 + Math.random() * 900000);
  const orderedItems = [...cart];
  const subtotal = orderedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedOffer ? Math.round(subtotal * (appliedOffer.percent / 100)) : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  // Close checkout input modal
  closeCheckoutModal();

  // Populate Order Success Modal
  const successOrderId = document.getElementById("success-order-id");
  const successCustomerName = document.getElementById("success-customer-name");
  const successAddress = document.getElementById("success-delivery-address");
  const successTotal = document.getElementById("success-order-total");
  const successItemsList = document.getElementById("success-order-items");

  if (successOrderId) successOrderId.innerText = `#${orderId}`;
  if (successCustomerName) successCustomerName.innerText = customerName;
  if (successAddress) successAddress.innerText = `${customerAddress} • Ph: ${customerPhone}`;
  if (successTotal) successTotal.innerText = `₹${finalTotal.toLocaleString("en-IN")}`;

  if (successItemsList) {
    successItemsList.innerHTML = orderedItems.map(item => `
      <li class="flex items-center justify-between text-xs py-1.5 border-b border-[#4E3224]/10">
        <span class="text-[#271711] font-medium">${item.name} × ${item.quantity}</span>
        <span class="font-bold text-[#C68A4C]">₹${item.price * item.quantity}</span>
      </li>
    `).join("");
  }

  // Open Order Success Modal
  const successModal = document.getElementById("order-success-modal");
  if (successModal) {
    successModal.classList.remove("opacity-0", "pointer-events-none");
    successModal.classList.add("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "hidden";
  }

  // Clear cart & applied offer
  cart = [];
  appliedOffer = null;
  saveCart();
  updateCartUI();
  form.reset();

  showToast(`🎉 Order #${orderId} Placed! Express brewing started.`);
}

function closeOrderSuccessModal() {
  const successModal = document.getElementById("order-success-modal");
  if (successModal) {
    successModal.classList.add("opacity-0", "pointer-events-none");
    successModal.classList.remove("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "";
  }
}

// ==========================================
// 6. "SIP & FEEL" BEVERAGE MOOD NOTES
// ==========================================
let selectedBeverageType = "☕ Coffee";
let selectedMoodFeeling = "⚡ Energized & Laser Focus";

const DEFAULT_MOOD_NOTES = [
  {
    drink: "☕ Coffee (Double Espresso)",
    mood: "⚡ Energized & Focus",
    note: "Just had the double espresso before my morning shift. Zero harsh acidity, just rich dark cocoa notes. Total focus!",
    author: "Karthi R.",
    city: "Bangalore",
    time: "10 mins ago"
  },
  {
    drink: "🍵 Tea (Lemon & Thyme)",
    mood: "🌿 Pure Peace",
    note: "The fresh garden thyme aroma with warm citrus Meyer lemon is pure therapy. Soothed my evening work headache completely.",
    author: "Divya M.",
    city: "Chennai",
    time: "25 mins ago"
  },
  {
    drink: "🧊 Iced Drink (Vanilla Cold Brew)",
    mood: "❄️ Crisp Refreshment",
    note: "Slow-steeped 18 hours makes a huge difference! Incredibly smooth over ice cubes with sweet Madagascar vanilla.",
    author: "Rahul S.",
    city: "Madurai",
    time: "1 hour ago"
  },
  {
    drink: "🍵 Tea (Kashmiri Masala Chai)",
    mood: "💛 Warm Comfort",
    note: "Crushed green cardamom and fresh ginger in an authentic clay Kullhad. Takes me right back to rainy monsoon mornings.",
    author: "Sneha P.",
    city: "Coimbatore",
    time: "2 hours ago"
  }
];

function selectMoodDrink(drink, buttonEl) {
  selectedBeverageType = drink;
  document.querySelectorAll(".mood-drink-btn").forEach(btn => btn.classList.remove("active"));
  if (buttonEl) {
    buttonEl.classList.add("active");
  }
}

function selectMoodFeeling(feeling, chipEl) {
  selectedMoodFeeling = feeling;
  document.querySelectorAll(".mood-chip").forEach(chip => chip.classList.remove("active"));
  if (chipEl) {
    chipEl.classList.add("active");
  }
}

function postMoodNote(event) {
  event.preventDefault();
  const textarea = document.getElementById("user-mood-note");
  const authorInput = document.getElementById("user-mood-author");
  
  if (!textarea || !textarea.value.trim()) {
    showToast("Please write a few words about how your cup felt!");
    return;
  }

  const newNote = {
    drink: selectedBeverageType,
    mood: selectedMoodFeeling,
    note: textarea.value.trim(),
    author: authorInput && authorInput.value.trim() ? authorInput.value.trim() : "AURA Beverage Lover",
    city: "Bangalore",
    time: "Just now"
  };

  let notes = [];
  try {
    const saved = localStorage.getItem("aura_roast_mood_notes");
    notes = saved ? JSON.parse(saved) : [...DEFAULT_MOOD_NOTES];
  } catch (e) {
    notes = [...DEFAULT_MOOD_NOTES];
  }

  notes.unshift(newNote);
  try {
    localStorage.setItem("aura_roast_mood_notes", JSON.stringify(notes));
  } catch (e) {}

  renderMoodNotesWall(notes);
  textarea.value = "";
  if (authorInput) authorInput.value = "";

  showToast("✨ Your Mood Note is live on our Tasting Wall! Thank you for sharing.");
}

function renderMoodNotesWall(notesList = null) {
  const container = document.getElementById("tasting-wall-grid");
  if (!container) return;

  let notes = notesList;
  if (!notes) {
    try {
      const saved = localStorage.getItem("aura_roast_mood_notes");
      notes = saved ? JSON.parse(saved) : [...DEFAULT_MOOD_NOTES];
    } catch (e) {
      notes = [...DEFAULT_MOOD_NOTES];
    }
  }

  container.innerHTML = notes.slice(0, 6).map(n => `
    <div class="tasting-note-card flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between text-xs mb-2">
          <span class="px-2.5 py-0.5 rounded-md bg-[#FAF6F0] border border-[#4E3224]/10 font-semibold text-[#271711]">
            ${n.drink}
          </span>
          <span class="text-[11px] text-[#7E6F66]">${n.time}</span>
        </div>
        <div class="text-xs font-bold text-[#C68A4C] mb-2 flex items-center gap-1">
          <span>${n.mood}</span>
        </div>
        <p class="text-xs text-[#4A3C34] leading-relaxed italic mb-3">
          "${n.note}"
        </p>
      </div>
      <div class="pt-2 border-t border-[#4E3224]/10 flex items-center justify-between text-[11px] text-[#7E6F66]">
        <span class="font-semibold text-[#271711]">${n.author}</span>
        <span>📍 ${n.city}</span>
      </div>
    </div>
  `).join("");
}

// ==========================================
// 7. GENERAL UTILITIES (Menu, Newsletter)
// ==========================================
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;
  menu.classList.toggle("hidden");
}

function handleNewsletter(event) {
  event.preventDefault();
  claimOffer("AURA50", 50, "Flat 50% Welcome Gift");
  showToast("☕ Welcome! Coupon AURA50 claimed automatically (50% OFF first order)!");
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
  renderMoodNotesWall();
  if (window.lucide) {
    lucide.createIcons();
  }
});

