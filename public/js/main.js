/* ============================================================
   CONFIGURATION — EDIT THESE
============================================================ */
const CONFIG = {
  // EDIT: Your WhatsApp number (country code + number, no + or spaces)
  whatsappNumber: "6598623687",

  // EDIT: Your Telegram username (without @) OR a t.me link
  telegramUsername: "@lamoree_photobook",

  // EDIT: Your currency symbol (used in messages)
  currency: "SGD",
};

/* ============================================================
   CART STATE
============================================================ */
let cart = [];

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
  openCart();
  // Also update the form summary
  updateFormSummary();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  updateFormSummary();
}

function getCartTotal() {
  // Extract numeric value from price string like "RM 85"
  return cart.reduce((sum, item) => {
    const num = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + num * item.qty;
  }, 0);
}

function updateCartUI() {
  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");
  const countEl = document.getElementById("cartCount");
  const fabEl = document.getElementById("cartFab");

  const totalCount = cart.reduce((s, i) => s + i.qty, 0);
  countEl.textContent = totalCount;
  fabEl.style.display = totalCount > 0 ? "flex" : "none";

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart__empty">Your cart is empty.</p>';
    footerEl.style.display = "none";
    return;
  }

  footerEl.style.display = "flex";
  totalEl.textContent = `${CONFIG.currency} ${getCartTotal().toFixed(2)}`;

  itemsEl.innerHTML = cart
    .map(
      (item, i) => `
    <div class="cart-item">
      <div class="cart-item__info">
        <h4>${item.name}</h4>
        <p>${item.price} × ${item.qty}</p>
      </div>
      <button class="cart-item__remove" onclick="removeFromCart(${i})">Remove</button>
    </div>
  `
    )
    .join("");
}

function updateFormSummary() {
  const formItems = document.getElementById("formCartItems");
  const formTotal = document.getElementById("formCartTotal");
  const formTotalAmt = document.getElementById("formTotalAmt");

  if (cart.length === 0) {
    formItems.innerHTML = '<p style="color:#aaa;font-size:.85rem">No items yet — add from above.</p>';
    formTotal.style.display = "none";
    return;
  }

  formItems.innerHTML = cart
    .map(
      (item) => `
    <div style="display:flex;justify-content:space-between;font-size:.88rem;padding:.3rem 0;color:#4a4540">
      <span>${item.name} ×${item.qty}</span>
      <span>${CONFIG.currency} ${(parseFloat(item.price.replace(/[^0-9.]/g,"")) * item.qty).toFixed(2)}</span>
    </div>
  `
    )
    .join("");

  formTotal.style.display = "block";
  formTotalAmt.textContent = `${CONFIG.currency} ${getCartTotal().toFixed(2)}`;
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

/* ============================================================
   ORDER / FORM SUBMISSION
============================================================ */
function submitOrder() {
  const name = document.getElementById("fname").value.trim();
  const phone = document.getElementById("fphone").value.trim();
  const email = document.getElementById("femail").value.trim();
  const address = document.getElementById("faddress").value.trim();
  const notes = document.getElementById("fnotes").value.trim();
  const contactMethod = document.querySelector('input[name="contact"]:checked').value;

  // Validation
  if (!name) { alert("Please enter your full name."); return; }
  if (!phone) { alert("Please enter your phone number."); return; }
  if (!address) { alert("Please enter your delivery address."); return; }

  if (cart.length === 0) {
    alert("Your cart is empty. Please add a product before ordering.");
    return;
  }

  // Build message
  const orderLines = cart
    .map((item) => `• ${item.name} ×${item.qty} — ${CONFIG.currency} ${(parseFloat(item.price.replace(/[^0-9.]/g,"")) * item.qty).toFixed(2)}`)
    .join("\n");

  const total = `${CONFIG.currency} ${getCartTotal().toFixed(2)}`;

  const message = `
Hello! I would like to place an order 📖

*Order Details:*
${orderLines}
*Total: ${total}*
---
*Customer Information:*
Name: ${name}
Phone: ${phone}
Email: ${email || "—"}

*Delivery Address:*
${address}

${notes ? `*Notes:*\n${notes}` : ""}
`.trim();

  const encodedMsg = encodeURIComponent(message);

  if (contactMethod === "whatsapp") {
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;
    window.open(url, "_blank");
  } else {
    const url = `https://t.me/${CONFIG.telegramUsername}?text=${encodedMsg}`;
    window.open(url, "_blank");
  }
}

/* ============================================================
   LIGHTBOX (for preview images)
============================================================ */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".preview-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

/* ============================================================
   NAV — scroll shadow + mobile menu
============================================================ */
function initNav() {
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  });

  const hamburger = document.querySelector(".nav__hamburger");
  const navLinks = document.querySelector(".nav__links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("mobile-open"));
  });
}

/* ============================================================
   FADE-IN ON SCROLL
============================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".hero__left, .hero__right, .about__text, .about__image, .preview-item, .product__card, .faq__item"
  );

  targets.forEach((el) => el.classList.add("fade-up"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ============================================================
   CART OVERLAY CLOSE
============================================================ */
document.getElementById("cartOverlay").addEventListener("click", closeCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartCheckout").addEventListener("click", closeCart);

/* ============================================================
   INIT
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initLightbox();
  initScrollReveal();
});
