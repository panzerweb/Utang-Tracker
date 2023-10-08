// todo Comments: Initialize variables
let customer_name, product_name, quantity, price_number;

// todo Comments: initialize total price
let totalPrice;

// todo Comments: initialize debts as an empty array
let debts = JSON.parse(localStorage.getItem('debts')) || [];

// ** Function to get value of initialized variables
function initializeVariables(){
    //* Get all element of variables, customername, productname, quantity, and price by their IDs.
    customer_name = document.getElementById('customer-name').value;
    product_name = document.getElementById('product-name').value;
    quantity = document.getElementById('quantity-number').value;
    price_number = document.getElementById('price-number').value;

    totalPrice = quantity * price_number; //** Multiply price and quantity
}

//!Function to add debts
function addDebt(){
    //! Callback the function of initializing variables function
    initializeVariables();

    //! Add new debt object, convert numerical variables using parseInt or parseFloat
    const newDebt = {
        customer_name,
        product_name,
        quantity: parseInt(quantity), //! Convert quantity into Integer
        price_number: parseFloat(price_number), //! Convert price number into Float
        totalPrice: parseFloat(totalPrice.toFixed(2)), //! Convert total price into Float, 
                                                        //! also toFixed(2) is optional
    };

    //! Push newDebt object to empty array
    debts.push(newDebt);

    //! To store the debts into an array in the local storage, use:
    //! set items in the localstorage and stringify the debts array
    localStorage.setItem('debts',JSON.stringify(debts));

    console.log(debts);

    checkBalance(newDebt);
}


//todo - Function for checking balance
function checkBalance() {
    //todo - Get the value of checkCustomer by id
    const checkCustomer =  document.getElementById('checkCustomer').value;


        //todo - Acquire existing debts by parsing local storage that gets the debts or initialize an empty array
        const debts = JSON.parse(localStorage.getItem('debts')) || [];

        //todo - filter debts to match customer name and the checkCustomer value
        const customerDebts = debts.filter(debt => {
            return debt.customer_name === checkCustomer;
        })
        //todo test: Get the products, price, quantity, and total to display
        const productDisplay = customerDebts.flatMap(debt => ({
            product: debt.product_name,
            price: debt.price_number,
            quantity: debt.quantity,
            priceEach: debt.quantity * debt.price_number,
        }));


        //todo - calculate the total balance or Sum using reduce(acc, debtValue)
        const totalBalance = customerDebts.reduce(function(accumulator, debtValue){
            return accumulator + debtValue.totalPrice;
        }, 0)
        //todo - Display the output using innerText
        document.getElementById('balance-result').innerText = `Total Balance for ${checkCustomer}: ${totalBalance.toFixed(2)}`;
        
            //todo - this is the code for the receipt feature
            //todo - Mapping the productDisplay function to return all properties in a listed form
            const formattedProductAndQty = productDisplay.map(item => {
                return `<li id="list-of-products">Product: ${item.product}
                                                | Qty: ${item.quantity}
                                                | Price: ${item.price}
                                                | <strong> Total: ${item.priceEach}</strong></li>`
            })
            //todo - Displaying the output of the receipt
            document.getElementById('product-list').innerHTML = formattedProductAndQty.join('');
        


}

//** Function for clearing debts of a customer
function clearDebts(){
    //** Get the value of the customer in the checkCustomer for clearing
    const clearCustomer = document.getElementById('checkCustomer').value;
    //** Acquire existing debts by parsing local storage that gets the debts or initialize an empty array
    const debts = JSON.parse(localStorage.getItem('debts')) || [];
    //** filter debts by matching customer name to the customer you want to clear
    const customerDebts = debts.filter(function(debt){
        return debt.customer_name === clearCustomer;
    })
        //** Set condition if customer has no debts or is length === 0, an alert must prompt
        if (customerDebts.length === 0) {
            alert(`No debts for ${clearCustomer}`);
            return;
        }
        //** calculate totalDebts by reduce method
        const totalDebts = customerDebts.reduce(function(accumulator, debtValue){
            return accumulator + debtValue.totalPrice;
        }, 0)
            //** confirm debts using confirm method
            const confirmDebt = confirm(`Total debt for ${clearCustomer}: ${totalDebts.toFixed(2)}. Confirm Payment?`);
                //** if confirm value is true, remove all debts for that customer.
                if(confirmDebt){
                    //** Updated Debts by removing debts for a customer: customerName !== clearCustomer
                    const updatedDebts = debts.filter(function(debt){
                        return debt.customer_name !== clearCustomer;
                    })
                    //** Update local storage by stringify the updatedDebts
                    localStorage.setItem('debts', JSON.stringify(updatedDebts));
                    //! Prompt all debts are clear
                    alert(`All Debts Cleared`);
                    location.reload();

                }


}

