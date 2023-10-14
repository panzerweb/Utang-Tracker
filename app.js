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
        //* Dates
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
    //todo - Get the value of checkCustomer by id
    const checkCustomer =  document.getElementById('checkCustomer').value;


        //todo - Acquire existing debts by parsing local storage that gets the debts or initialize an empty array
        let debts = JSON.parse(localStorage.getItem('debts')) || [];
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
                return `<tr>
                        <td>Product: ${item.product}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td><strong>${item.priceEach}</strong></td>
            </tr>`
            })
            //todo - Displaying the output of the receipt
            // document.getElementById('product-list').innerHTML = formattedProductAndQty.join('');           
                document.getElementById('product-list').innerHTML = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formattedProductAndQty.join('')}
                    </tbody>
                </table>
                `;
        


}

//** Function for clearing debts of a customer
function clearDebts(){
    //** Get the value of the customer in the checkCustomer for clearing
    const clearCustomer = document.getElementById('checkCustomer').value;
    //** Acquire existing debts by parsing local storage that gets the debts or initialize an empty array
    let debts = JSON.parse(localStorage.getItem('debts')) || [];
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


//!The code here is unusable until further updates

// function paymentHere() {
//     //* Dates
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const day = String(currentDate.getDate()).padStart(2, '0');


//     //*Get the customer values
//     const checkCustomer = document.getElementById('checkCustomer').value;
//     //* Retrieve the debts from local storage
//     let debts = JSON.parse(localStorage.getItem('debts')) || [];

//     //* Prompts the user for input
//     const promptUser = prompt("Enter payment: ");
//     const paymentPrompt = parseFloat(promptUser);

//     //*Checks if the payment is valid
//     //* if payment isNaN or Not A Number, or if payment is less than 0
//     if (isNaN(paymentPrompt || paymentPrompt <= 0)) {
//         alert("Please enter a valid payment amount.");
//         return;
//     }
    
//     //* find the debt object of the customer using find method
//     //* return debt.customer_name === checkCustomer
//     const customerDebt = debts.find(function(debt){
//         return debt.customer_name === checkCustomer;
//     })
    
//     //*Check if the debt exist, but this code is mainly for if there is no debt anymore
//     //* Use !customerDebt for expression
//     if (!customerDebt) {
//         alert(`No Debt for ${checkCustomer}`);
//         return;
//     }

//     //* Subtracts the prompt's amount from the customer totalPrice
//     customerDebt.totalPrice -= paymentPrompt;

//     //*After deducting, this code prevents the debt to become negative
//     //* Use Math.max()
//     customerDebt.totalPrice = Math.max(0, customerDebt.totalPrice);


//     //* Update the total balance in local storage
//     //*Use map method to see if customer_name === checkCustomer then return the customerDebt
//     debts = debts.map(function (debt) {
//         if (debt.customer_name === checkCustomer) {
//             return customerDebt;
//         }
//         //*Return the debt
//         return debt;
//     });
    
//     //*Update the local storage by stringifying the debts
//     localStorage.setItem('debts', JSON.stringify(debts));

//     //* Display the output
//     console.log(customerDebt.totalPrice.toFixed(2));
//     document.getElementById('balance-result').innerText = `Total Balance for ${checkCustomer}: ${customerDebt.totalPrice.toFixed(2)} 
//         - Last paid: ${year}-${month}-${day}`;
// }

