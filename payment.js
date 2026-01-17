function showFields() {
    const method = document.querySelector('input[name="pay"]:checked').value;

    document.getElementById("cardFields").style.display =
        method === "Card" ? "block" : "none";

    document.getElementById("addressField").style.display =
        method === "COD" ? "block" : "none";
}

function makePayment() {
    const username = document.getElementById("username").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!username || !contact) {
        alert("Please enter name and contact number");
        return;
    }

    const paymentMethod = document.querySelector('input[name="pay"]:checked');
    if (!paymentMethod) {
        alert("Please select payment method");
        return;
    }

    const method = paymentMethod.value;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = localStorage.getItem("total") || 0;

    let extraDetails = "";

    if (method === "Card") {
        const cardNumber = document.getElementById("cardNumber").value;
        const cardName = document.getElementById("cardName").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        if (!cardNumber || !cardName || !expiry || !cvv) {
            alert("Please fill all card details");
            return;
        }

        extraDetails = `
Card Holder: ${cardName}
Card Number: **** **** **** ${cardNumber.slice(-4)}
Expiry: ${expiry}
`;
    }

    if (method === "COD") {
        const address = document.getElementById("address").value.trim();
        if (!address) {
            alert("Please enter delivery address");
            return;
        }

        extraDetails = `
Delivery Address:
${address}
`;
    }

    let history = `🐾 Lucy Online Pet Store - Order History
----------------------------------
Date: ${new Date().toLocaleString()}

Customer Name: ${username}
Contact Number: ${contact}

Payment Method: ${method}

Items Purchased:
`;

    cart.forEach((item, i) => {
        history += `${i + 1}. ${item.name} - ₹${item.price}\n`;
    });

    history += `
Total Amount: ₹${total}
${extraDetails}
Payment Status: SUCCESS
----------------------------------
`;

    const blob = new Blob([history], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Lucy_PetStore_Order_History.txt";
    link.click();

    localStorage.clear();
    alert("✅ Order placed successfully");
    window.location.href = "index.html";
}
function calculateTotal() {
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    let discount = 0;

    // ✅ Apply 10% discount if total > 1000
    if (total > 1000) {
        discount = total * 0.10;
        total = total - discount;
    }

    document.getElementById("total").innerHTML =
        `Total Amount: ₹${total}<br>
         Discount: ₹${discount}`;
}
function completePayment() {
    document.getElementById("payStatus").innerText =
        "✅ Payment Successful! Thank you for shopping at Lucy Pet Store.";

    document.getElementById("feedbackSection").style.display = "block";
}



