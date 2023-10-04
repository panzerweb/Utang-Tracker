//Initialize variables
let customer_name, product_name, quantity, price_number;

//initialize total price
let totalPrice;

// initialize debts as an empty array
let debts = JSON.parse(localStorage.getItem('debts')) || [];

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

    //Add new debt object
    const newDebt = {
        customer_name,
        product_name,
        quantity: parseInt(quantity), //Convert into Integer
        price_number: parseFloat(price_number), //Convert into Float
        totalPrice: parseFloat(totalPrice.toFixed(2)), //Convert into Float
    };
    //Push newDebt object to empty array
    debts.push(newDebt);

    //To store the debts into an array in the local storage, use:
    //set items in the localstorage and stringify the debts array
    localStorage.setItem('debts',JSON.stringify(debts));

    console.log(debts);
}

//Function for checking balance
function checkBalance() {
    //Get the value of checkCustomer
    const checkCustomer =  document.getElementById('checkCustomer').value;
        //Acquire existing debts by parsing local storage that gets the debts or initialize an empty array
        const debts = JSON.parse(localStorage.getItem('debts')) || [];

        //filter debts to match customer name and the checkCustomer value
        const customerDebts = debts.filter(debt => {
            return debt.customer_name === checkCustomer;
        })
        //calculate the total balance/Sum using reduce(acc, debtValue)
        const totalBalance = customerDebts.reduce(function(accumulator, debtValue){
            return accumulator + debtValue.totalPrice;
        }, 0)
        //Display the output using innerText
        document.getElementById('balance-result').innerText = `Total Balance for ${checkCustomer}: ${totalBalance.toFixed(2)}`;
        




}