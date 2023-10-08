# Utang Tracker

## Overview of the Project

This is an Utang/Debt Tracker intended to be used for tracking debts of a person by using real-time input scenario and saves it as you go.

### Note: 
> This project is yet to have a backend feature, all datas are exclusively saved through your device's local storage.

## **FUNCTION**

# **initializeVariables()**

    The purpose of this function is to get the value of the variables initialized beforehand by callings its IDs from its respective HTML file.

    Here we also declared and initialized the total price variable by multiplying quantity and price.

## Code Explanation

```javascript
    // ** Function to get value of initialized variables
function initializeVariables(){
    //* Get all element of variables, customername, productname, quantity, and price by their IDs.
    customer_name = document.getElementById('customer-name').value;
    product_name = document.getElementById('product-name').value;
    quantity = document.getElementById('quantity-number').value;
    price_number = document.getElementById('price-number').value;

    totalPrice = quantity * price_number; //** Multiply price and quantity
}
```
---
---

# **addDebt()**

### Initialize Variables

#### Code Explanation
```javascript
initializeVariables();
```
### Create a New Debt Object
#### Code Explanation

```javascript
const newDebt = {
    customer_name,
    product_name,
    quantity: parseInt(quantity),
    price_number: parseFloat(price_number),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
};
```

### Push New Debt Object to Array
#### Code Explanation

```javascript
debts.push(newDebt);
```

### Store Debts in Local Storage
#### Code Explanation

```javascript
localStorage.setItem('debts', JSON.stringify(debts));
```

Converts the debts array to a JSON string using JSON.stringify() and stores it in the local storage under the key 'debts'.
This is a common practice for persisting data on the client side.


### Console Log the Updated Debts
#### Code Explanation

```javascript
console.log(debts);
```

### Check Balance
#### Code Explanation

```javascript
checkBalance(newDebt);
```

Calls a function (checkBalance()) with the newly added debt object as an argument. This function likely performs some operation related to checking the balance.

---
---
# **checkBalance() Function Documentation**

## Function Overview
The `checkBalance()` function is designed to check the total balance for a specific customer based on their accumulated debts. It fetches the customer name from an HTML element, retrieves the existing debts from local storage, filters debts by the customer name, calculates the total balance, and displays the results along with a detailed product-wise breakdown.

## Code Explanation
```javascript
// Get the value of checkCustomer by id
const checkCustomer =  document.getElementById('checkCustomer').value;

// Acquire existing debts by parsing local storage or initialize an empty array
const debts = JSON.parse(localStorage.getItem('debts')) || [];

// Filter debts to match customer name and the checkCustomer value
const customerDebts = debts.filter(debt => {
    return debt.customer_name === checkCustomer;
})

// Get products, price, quantity, and total to display
const productDisplay = customerDebts.flatMap(debt => ({
    product: debt.product_name,
    price: debt.price_number,
    quantity: debt.quantity,
    priceEach: debt.quantity * debt.price_number,
}));

// Calculate the total balance or Sum using reduce(acc, debtValue)
const totalBalance = customerDebts.reduce(function(accumulator, debtValue){
    return accumulator + debtValue.totalPrice;
}, 0)

// Display the output using innerText
document.getElementById('balance-result').innerText = `Total Balance for ${checkCustomer}: ${totalBalance.toFixed(2)}`;

// Code for the receipt feature
const formattedProductAndQty = productDisplay.map(item => {
    return `<tr>
            <td>Product: ${item.product}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td><strong>${item.priceEach}</strong></td>
    </tr>`
})

// Display the output of the receipt
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


```

## **Function Components of checkBalance()**

#### Input Retrieval:

* Fetches the customer name from an HTML element with the id checkCustomer.

#### Debts Retrieval:

* Retrieves existing debts from local storage and initializes an empty array if no debts are present.

#### Debts Filtering:

* Filters debts to match the customer name obtained from the input.

#### Balance Calculation:

* Calculates the total balance by summing up the totalPrice property of each debt using the reduce function.

#### Output Display:

* Displays the total balance for the customer in an HTML element with the id balance-result.

#### Receipt Feature:

* Maps and formats the product details for display in an HTML table.

#### Receipt Display:

* Displays the receipt table in an HTML element with the id product-list.


---
---
# **clearDebts() Function Documentation**

## Function Overview
The `clearDebts()` function is designed to clear all debts for a specific customer. It retrieves the customer name from an HTML element, fetches existing debts from local storage, filters debts by the customer name, calculates the total debts, prompts the user to confirm the payment, and if confirmed, removes all debts for that customer from the local storage.

## Code Explanation
```javascript
// Get the value of the customer in the checkCustomer for clearing
const clearCustomer = document.getElementById('checkCustomer').value;

// Acquire existing debts by parsing local storage or initialize an empty array
const debts = JSON.parse(localStorage.getItem('debts')) || [];

// Filter debts by matching customer name to the customer you want to clear
const customerDebts = debts.filter(function(debt){
    return debt.customer_name === clearCustomer;
})

// Set condition if the customer has no debts or is length === 0, an alert must prompt
if (customerDebts.length === 0) {
    alert(`No debts for ${clearCustomer}`);
    return;
}

// Calculate totalDebts by reduce method
const totalDebts = customerDebts.reduce(function(accumulator, debtValue){
    return accumulator + debtValue.totalPrice;
}, 0)

// Confirm debts using the confirm method
const confirmDebt = confirm(`Total debt for ${clearCustomer}: ${totalDebts.toFixed(2)}. Confirm Payment?`);

// If confirm value is true, remove all debts for that customer
if(confirmDebt){
    // Updated Debts by removing debts for a customer: customerName !== clearCustomer
    const updatedDebts = debts.filter(function(debt){
        return debt.customer_name !== clearCustomer;
    })

    // Update local storage by stringify the updatedDebts
    localStorage.setItem('debts', JSON.stringify(updatedDebts));

    // Prompt all debts are clear
    alert(`All Debts Cleared`);
    
    // Reload the page
    location.reload();
}

```

## **Function Components of clearDebt()**
#### Input Retrieval:

* Fetches the customer name from an HTML element with the id checkCustomer.

#### Debts Retrieval:

* Retrieves existing debts from local storage and initializes an empty array if no debts are present.

#### Debts Filtering:

* Filters debts by matching the customer name obtained from the input.

#### No Debts Alert:

* Displays an alert if the customer has no debts.

#### Total Debts Calculation:

* Calculates the total debts by summing up the totalPrice property of each debt using the reduce function.

#### Confirmation Prompt:

* Prompts the user to confirm the payment with the total debt amount.

#### Debt Removal:

* If the payment is confirmed, removes all debts for that customer by filtering out debts with a matching customer name.

#### Local Storage Update:

* Updates local storage with the new array of debts after removing the debts for the customer.

#### Debts Cleared Alert:

* Displays an alert indicating that all debts for the customer have been cleared.

#### Page Reload:

* Reloads the page to reflect the updated debts.




  

# **Examples**

#### The usage of this Debt Tracker has one  example:

1. Supposed your friend, neighbor or someone you know asks for something, he/she ask for a loan or just ask for money and you gave him/her.

2. Next, is you will input his/her name, you can input the product or you can also ignore it.

3. You can also ignore or not the quantity.

4. Then you put how much is the money he/she ask you for in the price section.

5. You can check everyday from your device his/her balance.

6. If he/she has paid everything, you can press clear debt.

---
# **Contact**

If you need support or would like to collaborate, feel free to reach out to us. We are here to assist you!

## Support

For any inquiries related to the Debt Tracker, including usage, issues, or general assistance, you can contact us at:

- **Email:** [panzerweb2023@gmail.com](mailto:panzerweb2023@gmail.com)
- **Phone:** [09090774336]

## Collaboration

If you're interested in collaborating on the Debt Tracker project, whether it's for enhancements, new features, or any other contributions, we welcome your involvement. Connect with us through:

- **GitHub Repository:** [Your Debt Tracker GitHub Repository](https://github.com/panzerweb/Utang-Tracker)



