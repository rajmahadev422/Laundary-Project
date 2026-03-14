const serviceItems = [
  {
    id: 1,
    service: "Dry Cleaning",
    price: 200.0,
  },
  {
    id: 2,
    service: "Wash & Fold",
    price: 100.0,
  },
  {
    id: 3,
    service: "Ironing",
    price: 30.0,
  },
  {
    id: 4,
    service: "Stain Removal",
    price: 500.0,
  },
  {
    id: 5,
    service: "Leather & Suede Cleaning",
    price: 500.0,
  },
  {
    id: 6,
    service: "Wedding Dress Cleaning",
    price: 1000.0,
  },
];

window.onload = function () {
  showCart();
  showSerivces();
  showAmount();
  bookBtnFunction();
};
const itemsElement = document.getElementById("items");
const cartElement = document.getElementById("cart-items");
const amtElement = document.getElementById("amount");
const bookBtn = document.getElementById("book-btn");
let cartItems = [];
let cartId = [];
let amount;
const showAmount = () => {
  amount = 0;
  cartItems.forEach((item) => (amount += item.price));
  amtElement.innerHTML = amount;
};
const showSerivces = () => {
  const items = serviceItems
    .map(
      (item) => `<div key="${item.id}" class="item">
                <p><span>${item.service}</span> <span>₹ ${item.price}</span></p>
                ${
                  !cartId.includes(item.id)
                    ? `<button onclick="addToCart(${item.id})" class="btn add-btn">Add
                  <ion-icon class="icon" name="add-circle-outline"></ion-icon>
                </button>`
                    : `<button onclick="removeFromCart(${item.id})" class="btn remove-btn">Remove
                  <ion-icon class="icon" name="close-circle-outline"></ion-icon>
                </button>`
                }
              </div>`
    )
    .join("");
  itemsElement.innerHTML = items;
};

const showCart = () => {
  if (cartItems.length === 0)
    cartElement.innerHTML = `<div class="no-cart">
                  <ion-icon class="big-icon" name="alert-circle-outline"></ion-icon>
                  <h6>No Items Added</h6>
                  <p>Add items to the cart from the services bar</p>
                </div>`;
  else {
    const carts = cartItems
      .map(
        (item, i) => `<div key=""${item.id} class="item-col">
                <span>${1 + i}</span>
                <span>${item.service}</span>
                <span>${item.price}</span>
              </div>`
      )
      .join("");

    cartElement.innerHTML = carts;
  }
  showAmount()
};

function addToCart(id) {
  const cart = serviceItems.filter((item) => id === item.id);
  cartId.push(id);
  cartItems = [...cartItems, ...cart];
  showCart();
  showSerivces();
  bookBtnFunction();
}

function removeFromCart(id) {
  cartItems = cartItems.filter((item) => id !== item.id);
  cartId = cartId.filter((idx) => idx !== id);
  showCart();
  showSerivces();
  bookBtnFunction();
}

function bookBtnFunction() {
  bookBtn.classList.add(["disabled"]);
  bookBtn.classList.add(["book-btn"]);
  cartItems.length === 0
    ? bookBtn.classList.remove("book-btn")
    : bookBtn.classList.remove("disabled");
}

const loading = (status) => {
  status ? bookBtn.innerHTML = 'Loading...' : bookBtn.innerHTML = 'Book Now';
}