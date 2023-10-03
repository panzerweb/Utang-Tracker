//todo -  Initialize variables
let customer_name, product_name, quantity, price_number;

//todo - total price get
let totalPrice;

//todo Get the debts
let debts = [];

function initializeVariables(){
    customer_name = document.getElementById('customer-name').value;
    product_name = document.getElementById('product-name').value;
    quantity = document.getElementById('quantity-number').value;
    price_number = document.getElementById('price-number').value;

    totalPrice = quantity * price_number;
}
function addDebt(){
    initializeVariables();

    const testForPush = `${"Name: " + customer_name} | ${"Product: " + product_name} | ${"Quantity: " + quantity} | ${"Price: " + price_number}| ${"Total: " + totalPrice}`;
    
    debts.push(testForPush);

    console.log(debts);
}