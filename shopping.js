// JavaScript
//an array of objects containing JavaScript objects that represent the items in the store object
let cart = [];

let addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        let itemElement = event.target.parentElement.parentElement; // Get the parent element of the button
        let itemName = itemElement.querySelector('.card-header').textContent;
        let itemPrice = itemElement.querySelector('.price').textContent;
        let itemImage = itemElement.querySelector('.base-image').src;

        let existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            let item = {
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            };
            cart.push(item);
        }

        // Update the cart count and display the view cart button
        let cartCount = document.querySelector('#cartCount');
        cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);

        let viewCartButton = document.querySelector('#viewCart');
        viewCartButton.style.display = 'block'; // Show the view cart button
    });
});

// Update the cart count and display the view cart button with the initial cart contents
let viewCartButton = document.querySelector('#viewCart');
viewCartButton.style.display = 'none'; // Hide the view cart button initially
viewCartButton.addEventListener('click', function() {
    let cartItems = document.querySelector('#cartItems');
    cartItems.innerHTML = '';

    let cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Your Shopping Cart';
    cartItems.appendChild(cartTitle);

    let total = 0;

    cart.forEach(function(item, index) {
        let itemTotal = parseFloat(item.price.replace('R', '')) * item.quantity;
        total += itemTotal;

        let itemElement = document.createElement('div');
        
        let itemImageElement = document.createElement('img');
        itemImageElement.src = item.image;
        itemImageElement.style.width = '60px';  
itemImageElement.style.height = '60px'; 

        let itemNameElement = document.createElement('div');
        itemNameElement.textContent = 'Item: ' + item.name;
        let itemPriceElement = document.createElement('div');
        itemPriceElement.textContent = 'Price: ' + item.price;

        let quantityElement = document.createElement('div');
        quantityElement.textContent = 'Quantity: ' + item.quantity;

        let itemTotalElement = document.createElement('div');
        itemTotalElement.textContent = 'Total: R' + itemTotal;

        let plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', function() {
            item.quantity++;
            updateCartDisplay();
        });

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#x1F5D1; Delete'; // Unicode character for the trash bin icon
        deleteButton.addEventListener('click', function() {
            cart.splice(index, 1);
            updateCartDisplay();
        });

    itemElement.appendChild(deleteButton); // Append the delete button to the itemElement

        let minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', function() {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCartDisplay();
        });

        quantityElement.appendChild(plusButton);
        quantityElement.appendChild(minusButton);
        itemElement.appendChild(itemImageElement);
        itemElement.appendChild(itemNameElement);
        itemElement.appendChild(itemPriceElement);
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(itemTotalElement);
        cartItems.appendChild(itemElement);
    });

    let cartTotal = document.querySelector('#cartTotal');
    cartTotal.textContent = 'Subtotal: R' + total;

    let cartPopup = document.querySelector('#cartPopup');
    cartPopup.style.display = 'block'; // Show the popup
});

let closePopupButton = document.querySelector('#closePopup');
closePopupButton.addEventListener('click', function() {
    let cartPopup = document.querySelector('#cartPopup');
    cartPopup.style.display = 'none'; // Hide the popup
});

function updateCartDisplay() {
    let cartCount = document.querySelector('#cartCount');
    cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);

    let viewCartButton = document.querySelector('#viewCart');
    if (cart.length > 0) {
        viewCartButton.style.display = 'block'; // Show the view cart button
    } else {
        viewCartButton.style.display = 'none'; // Hide the view cart button
    }

    let cartPopup = document.querySelector('#cartPopup');
    if (cartPopup.style.display === 'block') {
        viewCartButton.click(); // Update the popup if it's currently displayed
    }
}