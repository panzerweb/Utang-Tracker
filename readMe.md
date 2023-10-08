# Utang Tracker

## Overview of the Project

This is an Utang/Debt Tracker intended to be used for tracking debts of a person by using real-time input scenario and saves it as you go.

### Note: 
> This project is yet to have a backend feature, all datas are exclusively saved through your device's local storage.

## **FUNCTION**

### initializeVariables()

    The purpose of this function is to get the value of the variables initialized beforehand by callings its IDs from its respective HTML file.

    Here we also declared and initialized the total price variable by multiplying quantity and price.


### addDebt()

#### Initialize Variables
```javascript
initializeVariables();
```
#### Create a New Debt Object

```
const newDebt = {
    customer_name,
    product_name,
    quantity: parseInt(quantity),
    price_number: parseFloat(price_number),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
};
```