// Chocolate static Data
let chocolates = [
  {
    id: 1,
    name: "Milk Chocolate Bar",
    brand: "Sweet Delight",
    flavor: "Milk",
    weight: "100g",
    price: 20,
    image: "images/1.webp",
  },
  {
    id: 2,
    name: "Dark Chocolate Truffles",
    brand: "Bitter Bliss",
    flavor: "Dark",
    weight: "150g",
    price: 20,
    image: "images/2.webp",
  },
  {
    id: 3,
    name: "White Chocolate with Almonds",
    brand: "Nuts Galore",
    flavor: "White",
    weight: "120g",
    price: 100,
    image: "images/3.webp",
  },
  {
    id: 4,
    name: "Caramel Crunch Chocolate",
    brand: "Sweet Symphony",
    flavor: "Caramel",
    weight: "80g",
    price: 25,
    image: "images/4.webp",
  },
  {
    id: 5,
    name: "Hazelnut Milk Chocolate",
    brand: "Nutty Delights",
    flavor: "Hazelnut",
    weight: "110g",
    price: 30,
    image: "images/5.webp",
  },
  {
    id: 6,
    name: "Raspberry Dark Chocolate",
    brand: "Berry Bliss",
    flavor: "Dark",
    weight: "130g",
    price: 250,
    image: "images/6.webp",
  },
  {
    id: 7,
    name: "Orange Zest White Chocolate",
    brand: "Citrus Sensation",
    flavor: "White",
    weight: "95g",
    price: 150,
    image: "images/7.webp",
  },
  {
    id: 8,
    name: "Mint Chocolate Chip Bar",
    brand: "Cool Cravings",
    flavor: "Mint",
    weight: "125g",
    price: 80,
    image: "images/8.webp",
  },
  {
    id: 9,
    name: "Toffee Crunch Dark Chocolate",
    brand: "Toffee Treats",
    flavor: "Dark",
    weight: "140g",
    price: 60,
    image: "images/9.webp",
  },
];
// Product Slider
let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active = 0;
let lengthItems = items.length - 1;
let refreshSlider = setInterval(() => {
  next.click();
}, 2400);

next.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active += 1;
  }
  reloadSlider();
};
prev.onclick = function () {
  if (active - 1 < 0) {
    active = lengthItems;
  } else {
    active -= 1;
  }
  reloadSlider();
};

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector(".slider .dots li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 2400);
}

// Cart
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let listy = document.querySelector(".listy");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let cart = document.querySelector(".card");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
  cart.classList.remove("go");
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
  cart.classList.add("go");
});

let count;
let listCards = [];
function initApp() {
  chocolates.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
        <img src="${value.image}"/>
        <div class="title">${value.name}</div>
        <div class="price">Rs.${value.price.toLocaleString()}</div>
        <button onClick="addToCard(${key})">Add To Cart</button>
        `;
    listy.appendChild(newDiv);
  });
}
initApp();

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(chocolates[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = "";
  count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
            <div><img src="${value.image}"/></div>
            <div>${value.name}</div>
            <div>Rs.${value.price.toLocaleString()}</div>
            <div>
            <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      }, 1)">-</button>
            <div class="count">${value.quantity}</div>
            <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      }, 0)">+</button><br/>
            </div>            

            `;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = `Rs.${totalPrice.toLocaleString()}`;
  quantity.innerText = count;
}

function changeQuantity(key, quantity, val) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    if (count < 8 || val) {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * chocolates[key].price;
    } else {
      {
        alert("Maximum chocolate bundle limit of 8 reached");
      }
    }
  }
  reloadCard();
}
