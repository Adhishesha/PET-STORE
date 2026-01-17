

const productsData = {
    dog: [
        { name: "Dog Food", price: 500, img: "images/dog food.jpeg" },
        { name: "Dog Toy", price: 300, img: "images/dog toy.jpeg" },
        { name: "Dog Bed", price: 1200, img: "images/dog bed.jpeg" },
        { name: "Dog Collar", price: 250, img: "images/dog collar.jpeg" },
        { name: "Dog Shampoo", price: 350, img: "images/dog shampoo.jpeg" }
    ],

    cat: [
        { name: "Cat Food", price: 450, img: "images/cat food.jpeg" },
        { name: "Cat Toy", price: 200, img: "images/cat toy.jpeg" },
        { name: "Cat Litter", price: 600, img: "images/cat litter.jpeg" },
        { name: "Cat Bowl", price: 180, img: "images/cat bowl.jpeg" },
        { name: "Cat Scratcher", price: 900, img: "images/cat scratcher.jpeg" }
    ],

    bird: [
        { name: "Bird Seeds", price: 250, img: "images/birds seeds.jpeg" },
        { name: "Bird Cage", price: 1500, img: "images/bird cage.jpeg" },
        { name: "Bird Feeder", price: 180, img: "images/bird water feeder.jpeg" },
        { name: "Bird Vitamins", price: 300, img: "images/bird vitamins.jpeg" },
        { name: "Bird Nest", price: 400, img: "images/bird nest.jpeg" }
    ],

    fish: [
        { name: "Fish Food", price: 200, img: "images/fish food.jpeg" },
        { name: "Fish Tank", price: 3000, img: "images/fish tank.jpeg" },
        { name: "Water Filter", price: 1200, img: "images/water filter.jpeg" },
        { name: "Air Pump", price: 700, img: "images/air pump.jpeg" },
        { name: "Tank Decor", price: 450, img: "images/tank decorations.jpeg" }
    ]
};

function showCategory(category) {
    const products = document.getElementById("products");
    products.innerHTML = "";

    productsData[category].forEach(p => {
        products.innerHTML += `
            <div class="product">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <li>
                ${item.name} - ₹${item.price}
                <button onclick="removeFromCart(${index})">❌</button>
            </li>
        `;
    });

    document.getElementById("total").innerText = total;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total);
}

function goToPayment() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }
    window.location.href = "payment.html";
}
// GLOBAL VARIABLES
let cart = [];
let total = 0;

// ADD TO CART
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCart();
}

// UPDATE CART
function updateCart() {
    const cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <li>
                ${item.name} - ₹${item.price}
                <button onclick="removeFromCart(${index})">❌</button>
            </li>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total);
}

// REMOVE FROM CART
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// GO TO PAYMENT PAGE
function goToPayment() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }
    window.location.href = "payment.html";
}
function saveFeedback() {
    const name = document.getElementById("fbName").value;
    const message = document.getElementById("fbMessage").value;

    if (name === "" || message === "") {
        alert("Please fill all fields");
        return;
    }

    let feedbackText = "🐾 Lucy Pet Store - Feedback\n\n";
    feedbackText += "Name: " + name + "\n";
    feedbackText += "Feedback: " + message + "\n";
    feedbackText += "Date: " + new Date().toLocaleString();

    const blob = new Blob([feedbackText], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "LucyPetStore_Feedback.txt";
    link.click();

    alert("Thank you for your feedback!");
    document.getElementById("fbName").value = "";
    document.getElementById("fbMessage").value = "";
}
