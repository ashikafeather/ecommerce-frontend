function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(item => {
    total += item.qty;
  });

  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.innerText = total;
    badge.style.display = total > 0 ? "inline-block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);
