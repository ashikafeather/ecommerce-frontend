let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartItems = document.getElementById("cart-items");
let grandTotal = 0;

cart.forEach((item, index) => {
  let total = item.price * item.qty;
  grandTotal += total;

  cartItems.innerHTML += `
    <tr>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>
        <button onclick="changeQty(${index}, -1)">-</button>
        ${item.qty}
        <button onclick="changeQty(${index}, 1)">+</button>
      </td>
      <td>₹${total}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    </tr>
  `;
});

document.getElementById("grand-total").innerText = "Grand Total: ₹" + grandTotal;

function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

