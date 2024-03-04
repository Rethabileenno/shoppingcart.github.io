// JavaScript
//an array of objects containing JavaScript objects that represent the items in the store object
var cart = [];

var addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var itemElement = event.target.parentElement.parentElement; // Get the parent element of the button
        var itemName = itemElement.querySelector('.card-header').textContent;
        var itemPrice = itemElement.querySelector('.price').textContent;
        var itemImage = itemElement.querySelector('.base-image').src;

        var existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            var item = {
                name: itemName,
                price: itemPrice,
                image: itemImage,
                quantity: 1
            };
            cart.push(item);
        }

        // Update the cart count and display the view cart button
        var cartCount = document.querySelector('#cartCount');
        cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);

        var viewCartButton = document.querySelector('#viewCart');
        viewCartButton.style.display = 'block'; // Show the view cart button
    });
});

// Update the cart count and display the view cart button with the initial cart contents
var viewCartButton = document.querySelector('#viewCart');
viewCartButton.style.display = 'none'; // Hide the view cart button initially
viewCartButton.addEventListener('click', function() {
    var cartItems = document.querySelector('#cartItems');
    cartItems.innerHTML = '';

    var cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Your Shopping Cart';
    cartItems.appendChild(cartTitle);

    var total = 0;

    cart.forEach(function(item, index) {
        var itemTotal = parseFloat(item.price.replace('R', '')) * item.quantity;
        total += itemTotal;

        var itemElement = document.createElement('div');
        
        var itemImageElement = document.createElement('img');
        itemImageElement.src = item.image;
        itemImageElement.style.width = '60px';  
itemImageElement.style.height = '60px'; 

        var itemNameElement = document.createElement('div');
        itemNameElement.textContent = 'Item: ' + item.name;
        var itemPriceElement = document.createElement('div');
        itemPriceElement.textContent = 'Price: ' + item.price;

        var quantityElement = document.createElement('div');
        quantityElement.textContent = 'Quantity: ' + item.quantity;

        var itemTotalElement = document.createElement('div');
        itemTotalElement.textContent = 'Total: R' + itemTotal;

        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', function() {
            item.quantity++;
            updateCartDisplay();
        });

        var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        cart.splice(index, 1);
        updateCartDisplay();
    });

    itemElement.appendChild(deleteButton); // Append the delete button to the itemElement

        var minusButton = document.createElement('button');
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

    var cartTotal = document.querySelector('#cartTotal');
    cartTotal.textContent = 'Subtotal: R' + total;

    var cartPopup = document.querySelector('#cartPopup');
    cartPopup.style.display = 'block'; // Show the popup
});

var closePopupButton = document.querySelector('#closePopup');
closePopupButton.addEventListener('click', function() {
    var cartPopup = document.querySelector('#cartPopup');
    cartPopup.style.display = 'none'; // Hide the popup
});

function updateCartDisplay() {
    var cartCount = document.querySelector('#cartCount');
    cartCount.textContent = cart.reduce((count, item) => count + item.quantity, 0);

    var viewCartButton = document.querySelector('#viewCart');
    if (cart.length > 0) {
        viewCartButton.style.display = 'block'; // Show the view cart button
    } else {
        viewCartButton.style.display = 'none'; // Hide the view cart button
    }

    var cartPopup = document.querySelector('#cartPopup');
    if (cartPopup.style.display === 'block') {
        viewCartButton.click(); // Update the popup if it's currently displayed
    }
}