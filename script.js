document.addEventListener("DOMContentLoaded", () => {
  //dispalying products dnamically
  const products = [
    //This is our mock product list, normally fetched from a database or API.
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || []; //as the btn has been clicked products has been pushes into the cart  🟢 This is an empty array to store products that the user adds to the cart

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  //Render all these products - run the loop over the products
  products.forEach((product) => {
    //product is an array so we have used for each 🔹 forEach() is a method that runs a function for each item in the products array.
    // product here is a temporary name used for the current item being processed.
    // So the loop will run 3 times, once for each product.
    const productDiv = document.createElement("div"); // creating div for each product
    productDiv.classList.add("product"); //adding a product class to the div
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span> 
    
    <button data-id="${product.id}">Add to cart</button>
    `; //fixed to for maintainng precision
    //data-id="${product.id}": This is a custom attribute used to store the product's id so we know which item was clicked later.
    productList.appendChild(productDiv); //now we have to attach the div to the product list
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      //products is to be only added when button is clicked not anywhere in the div
      const productId = parseInt(e.target.getAttribute("data-id")); //the typeOf (e.target.getAttribute("data-id") is a string but the id is integer so we cant use it directly
      const product = products.find((p) => p.id === productId); //return the element whose product id is matches to the dataid which is clicked
      addToCart(product); //now grab the product to the cart
    }
    //product id k paas integer mai wo id hai jo user ne select kari hai or wo id apan grab karke addticart mai add kar rahe h
  });

  function addToCart(product) {
    cart.push(product);
    saveTasks();
    renderCart();
  } //🔹 This adds the product to the cart array using .push() and calls renderCart() to update the cart on screen.

  function renderCart() {
    //we have to render the products in the shopping cart along with the total price
    cartItems.innerText = ""; //here we can also add hidden class but another way is that re-writing the inner html as blank string so that the ur cart is empty line removes out
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      // Hide the “Your cart is empty” message
      // Show the total price section

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div"); //creating a div for the shopping product display
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        cartItem.style.display = "flex";
        cartItem.style.justifyContent = "space-between";
        cartItem.style.alignItems = "center";
        cartItem.style.marginBottom = "10px";


        cartItem.querySelector("button").addEventListener("click", (e) => {
          e.stopPropagation(); //prevent toggle from firing (Event bubbling)
          cart.splice(index, 1); // Remove 1 item at this index
          saveTasks(); // Save updated cart
          renderCart(); // Re-render
        });



        cartItems.appendChild(cartItem); //attach the hanging div to the cartItem
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`; //after checkout
    }
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0; //Clears all items from the cart (empties the array)
    alert("Checkout successfully");
    renderCart();
  });
  function saveTasks(){
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
