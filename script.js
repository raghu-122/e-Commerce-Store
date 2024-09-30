const apiURL = 'https://fakestoreapi.com/products';
let cart = [];
let wishlist = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch(apiURL)
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
            <span class="heart" onclick="toggleWishlist(${product.id}, '${product.title}', ${product.price}, '${product.image}')">&#10084;</span>
        `;
        productsContainer.appendChild(productCard);
    });
}

function addToCart(id, title, price, image) {
    const item = { id, title, price, image };
    if (validateInput(title, price)) {
        cart.push(item);
        totalPrice += price;
        showNotification(`${title} has been added to the cart!`); // Fixed template literal
        updateCartDisplay();
    } else {
        showNotification('Invalid product information. Please check the title and price.');
    }
}

function validateInput(title, price) {
    return title && price > 0; // Basic validation
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.title}" style="width: 50px;"> ${item.title} - $${item.price}`; // Fixed template literal
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement.style.display === 'block') {
        cartElement.style.display = 'none'; 
    } else {
        updateCartDisplay(); 
        cartElement.style.display = 'block'; 
    }
}

function toggleWishlist(id, title, price, image) {
    const item = { id, title, price, image };
    if (wishlist.some(wishItem => wishItem.id === id)) { // Check if item is already in wishlist
        wishlist = wishlist.filter(wishItem => wishItem.id !== id); 
        showNotification(`${title} removed from wishlist.`); // Fixed template literal
    } else {
        wishlist.push(item); 
        showNotification(`${title} added to wishlist!`); // Fixed template literal
    }
}

function showWishlist() {
    const wishlistElement = document.getElementById('wishlist');
    wishlistElement.style.display = wishlistElement.style.display === 'block' ? 'none' : 'block'; 
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = ''; 
    wishlist.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.title}" style="width: 50px;"> ${item.title} - $${item.price}`; // Fixed template literal
        wishlistItems.appendChild(li);
    });
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function checkout() {
    alert('Proceeding to checkout with total: $' + totalPrice.toFixed(2));
}