// basket.js

// Load basket from localStorage
function loadBasket() {
  try {
    const data = JSON.parse(localStorage.getItem("basket"));
    if (!Array.isArray(data)) return [];
    return data;
  } catch (e) {
    return [];
  }
}

// Save basket to localStorage
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// Add product to basket
function addToBasket(product) {
  let basket = loadBasket();

  // Check if product with same id, size, and color exists
  const existingIndex = basket.findIndex(item =>
    item.id === product.id &&
    item.size === product.size &&
    item.color === product.color
  );

  if (existingIndex !== -1) {
    // If exists, replace quantity instead of doubling
    basket[existingIndex].qty = product.qty;
  } else {
    basket.push(product);
  }

  saveBasket(basket);
}

// Quantity increase/decrease buttons
document.addEventListener("DOMContentLoaded", () => {
  let qty = 1;
  const qtyDisplay = document.getElementById("quantity-display");
  const qtyHidden = document.getElementById("quantity");

  if (qtyDisplay && qtyHidden) {
    document.getElementById("increase").addEventListener("click", () => {
      qty++;
      qtyDisplay.textContent = qty;
      qtyHidden.value = qty;
    });

    document.getElementById("decrease").addEventListener("click", () => {
      if (qty > 1) {
        qty--;
        qtyDisplay.textContent = qty;
        qtyHidden.value = qty;
      }
    });
  }

  // Add to basket button
  document.querySelectorAll(".add-to-basket").forEach(btn => {
    btn.addEventListener("click", () => {
      const qty = parseInt(document.getElementById("quantity").value) || 1;
      const color = document.getElementById("selectedColor").value;
      const colorName = document.getElementById("selectedColorName").value;
      const sizeSelect = document.getElementById("size");
      const size = sizeSelect ? sizeSelect.value : "";

      if (!color) {
        alert("الرجاء اختيار اللون!");
        return;
      }

      // ✅ Fix image path for GitHub Pages
      const baseUrl = window.location.origin;

      const product = {
        id: btn.getAttribute("data-id"),
        title: btn.getAttribute("data-title"),
        price: parseFloat(btn.getAttribute("data-price")),
        image: baseUrl + btn.getAttribute("data-image"),
        qty: qty,
        color: color,
        colorName: colorName,
        size: size
      };

      addToBasket(product);
      alert(`${product.title} تمت إضافته إلى السلة!`);
    });
  });
});