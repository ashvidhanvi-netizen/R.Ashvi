/**
 * AURA ROAST — "What's Your Perfect Brew?" Recommendation Engine
 * Matches mood and craving to the ideal artisan coffee or tea blend.
 */

const BREW_PROFILES = {
  bold: {
    id: "p1",
    name: "Classic Double Espresso",
    category: "Coffee",
    badge: "Strong & Bold",
    badgeClass: "badge-coffee",
    desc: "A rich, concentrated double extraction showcasing dark chocolate undertones, toasted hazelnuts, and a dense golden crema. Handcrafted for when you need pure intensity and focus.",
    tastingNotes: ["Dark Cocoa", "Roasted Hazelnut", "Golden Crema"],
    brewMethod: "High-Pressure 9-Bar Extraction (93°C)",
    servingTemp: "Piping Hot • 60ml",
    price: 99,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=900&auto=format&fit=crop"
  },
  creamy: {
    id: "p2",
    name: "Caramel Latte",
    category: "Coffee",
    badge: "Sweet & Creamy",
    badgeClass: "badge-coffee",
    desc: "Smooth artisan espresso poured gently over velvety steamed whole milk, kissed with organic golden caramel reduction. The ultimate comforting indulgence for any hour of the day.",
    tastingNotes: ["Golden Caramel", "Warm Vanilla", "Velvet Micro-Foam"],
    brewMethod: "Steamed Silk Texture Micro-Foam",
    servingTemp: "Warm & Silky • 280ml",
    price: 239,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=900&auto=format&fit=crop"
  },
  refreshing: {
    id: "p5",
    name: "Peach Iced Tea",
    category: "Iced Drinks",
    badge: "Fresh & Refreshing",
    badgeClass: "badge-iced",
    desc: "Slow-brewed loose-leaf Nilgiri black tea infused with sun-ripened orchard white peach essence, served crisp over clear ice cubes with a fresh mint garnish. Incredibly crisp and revitalizing.",
    tastingNotes: ["Sun-Ripened Peach", "Crisp Nilgiri Black Tea", "Garden Mint"],
    brewMethod: "Cold Steeped 12-Hour Extraction",
    servingTemp: "Ice Cold • 350ml",
    price: 169,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=900&auto=format&fit=crop"
  },
  calm: {
    id: "p3",
    name: "Lemon & Thyme Tea",
    category: "Tea",
    badge: "Calm & Relaxing",
    badgeClass: "badge-tea",
    desc: "Handcrafted whole-leaf tea infused with sun-dried Meyer lemon peel and freshly bruised fragrant garden thyme sprigs. Balances bright citrus vibrancy with an aromatic herbal serenity.",
    tastingNotes: ["Meyer Lemon Citrus", "French Garden Thyme", "Wild Mountain Honey"],
    brewMethod: "8-Minute Whole-Leaf Infusion (88°C)",
    servingTemp: "Soothing Warmth • 300ml",
    price: 149,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop"
  }
};

let activeMood = "bold";

function selectBrewMood(moodKey, buttonEl) {
  activeMood = moodKey;

  // Update active state on mood buttons
  document.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  if (buttonEl) {
    buttonEl.classList.add("active");
  }

  const profile = BREW_PROFILES[moodKey];
  if (!profile) return;

  const resultContainer = document.getElementById("quiz-result-container");
  if (!resultContainer) return;

  // Fade transition
  resultContainer.style.opacity = "0";
  resultContainer.style.transform = "translateY(8px)";

  setTimeout(() => {
    resultContainer.innerHTML = `
      <div class="bg-white rounded-2xl border border-[#4E3224]/10 p-6 md:p-8 shadow-lg flex flex-col md:flex-row gap-6 md:gap-8 items-center transition-all">
        <div class="w-full md:w-5/12 h-64 md:h-72 rounded-xl overflow-hidden relative shadow-md">
          <img src="${profile.image}" alt="${profile.name}" class="w-full h-full object-cover">
          <span class="absolute top-3 left-3 ${profile.badgeClass} badge-pill font-medium shadow-sm">
            ${profile.badge}
          </span>
        </div>
        <div class="w-full md:w-7/12 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs uppercase tracking-widest font-semibold text-[#C68A4C]">${profile.category} Recommendation</span>
              <span class="text-[#4E3224]/30">•</span>
              <div class="flex items-center text-[#F59E0B] text-xs">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
                <span class="ml-1 font-semibold text-[#271711]">4.9 (Artisan Pick)</span>
              </div>
            </div>
            <h3 class="font-serif text-2xl md:text-3xl font-bold text-[#271711] mb-2">${profile.name}</h3>
            <p class="text-sm text-[#4A3C34] leading-relaxed mb-4">${profile.desc}</p>
            
            <!-- Tasting Notes Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              ${profile.tastingNotes.map(note => `
                <span class="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F8F3EC] text-[#4E3224] border border-[#4E3224]/10">
                  🌿 ${note}
                </span>
              `).join("")}
            </div>

            <!-- Brew Specs Grid -->
            <div class="grid grid-cols-2 gap-3 py-3 border-y border-[#4E3224]/10 text-xs mb-5">
              <div>
                <span class="text-[#7E6F66] block font-medium">Brewing Style</span>
                <span class="text-[#271711] font-semibold">${profile.brewMethod}</span>
              </div>
              <div>
                <span class="text-[#7E6F66] block font-medium">Optimal Serve</span>
                <span class="text-[#271711] font-semibold">${profile.servingTemp}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between gap-4 pt-2">
            <div>
              <span class="text-xs text-[#7E6F66] block">Handcrafted Price</span>
              <span class="text-2xl font-bold text-[#271711] font-serif">₹${profile.price}</span>
            </div>
            <button onclick="addToCart('${profile.id}', '${profile.name}', ${profile.price}, '${profile.image}')" 
                    class="btn-caramel px-6 py-3 text-sm font-semibold shadow-md flex items-center gap-2">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              Add Recommended Brew
            </button>
          </div>
        </div>
      </div>
    `;

    resultContainer.style.opacity = "1";
    resultContainer.style.transform = "translateY(0)";

    if (window.lucide) {
      lucide.createIcons();
    }
  }, 200);
}

// Initial trigger on load
window.addEventListener("DOMContentLoaded", () => {
  const firstBtn = document.querySelector(".quiz-option-btn");
  if (firstBtn) {
    selectBrewMood("bold", firstBtn);
  }
});
