//Initialize variables
let customer_name, product_name, quantity, price_number;

//initialize total price
let totalPrice;

// initialize debts as an empty array
let debts = [];

//Function to get value of initialized variables
function initializeVariables(){
    customer_name = document.getElementById('customer-name').value;
    product_name = document.getElementById('product-name').value;
    quantity = document.getElementById('quantity-number').value;
    price_number = document.getElementById('price-number').value;

    totalPrice = quantity * price_number; //Multiply price and quantity
}
function addDebt(){
    //Callback function
    initializeVariables();

    //Add new Debts to push
    const testForPush = `${"Name: " + customer_name} | ${"Product: " + product_name} | ${"Quantity: " + quantity} | ${"Price: " + price_number}| ${"Total: " + totalPrice}`;
    //Finally push
    debts.push(testForPush);
    //Run for testing
    console.log(debts);
}