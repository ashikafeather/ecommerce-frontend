// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function addToCart(name, price) {
//   cart.push({ name, price });
//   localStorage.setItem("cart", JSON.stringify(cart));
//   alert("Added to cart");
// }

// cart button
// function goToCart() {
//     window.location.href = "cart.html";
// }


// Fetch products and display on page
document.addEventListener("DOMContentLoaded", function () {

  fetch("http://localhost:8080/api/products")
    .then(res => res.json())
    .then(data => {
const container = document.getElementById("productGrid") 
                      || document.getElementById("productContainer");
        container.innerHTML = "";

      data.forEach(product => {

        container.innerHTML += `
          <div class="col-md-4">
            <div class="product-card">

              <a href="products.html?id=${product.id}">
                <img src="http://localhost:8080/uploads/${product.image}" 
                     alt="${product.name}" 
                     class="img-fluid" 
                     style="cursor:pointer;">
              </a>

              <h6>${product.name}</h6>
              <p>₹${product.price}</p>

              <button class="btn btn-dark btn-sm"
                onclick="addToCart('${product.name}', ${product.price}, '${product.image}', 'M')">
                Add to Cart
              </button>

            </div>
          </div> 
        `;
      });
    });

});


//addcart button click function
function addToCart(name, price, img, size = "M") {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const fullImagePath = "http://localhost:8080/uploads/" + img;

  const existing = cart.find(item =>
    item.name === name && item.size === size
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      img: fullImagePath,  
      size: size,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  window.location.href = "cart.html";
}


//profile details
document.addEventListener("DOMContentLoaded", function () {

  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");

  if (name && email) {
    document.getElementById("profileName").textContent = name;
    document.getElementById("profileEmail").textContent = email;

    document.getElementById("signInBtn").classList.add("d-none");
    document.getElementById("signUpBtn").classList.add("d-none");
    document.getElementById("logoutBtn").classList.remove("d-none");
  }

  document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
  });

});
// add-products API
document.getElementById("addProductForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const formData = new FormData(this);

  const response = await fetch("http://localhost:8080/api/admin/add-product", {
    method: "POST",
    body: formData
  });

  const result = await response.text();

  if(response.ok){
    alert("Product Added Successfully");
    this.reset();
    document.getElementById("imagePreview").classList.add("d-none");
  } else {
    alert("Error: " + result);
  }
});