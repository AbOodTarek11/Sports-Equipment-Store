let cart = [];

// فتح سلة المشتريات
document.getElementById('open-cart').addEventListener('click', function() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block'; 
    setTimeout(() => {
        modal.classList.add('show'); 
    }, 10); 
    updateCart();
});

// إغلاق سلة المشتريات
document.getElementById('close-cart').addEventListener('click', function() {
    const modal = document.getElementById('cart-modal');
    modal.classList.remove('show'); 

    // إخفاء السلة بعد الانتهاء من الرسوم المتحركة
    setTimeout(() => {
        modal.style.display = 'none'; 
    }, 500); 
});

// إغلاق السلة عند النقر خارجها
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.classList.remove('show'); 

        // إخفاء السلة بعد الانتهاء من الرسوم المتحركة
        setTimeout(() => {
            modal.style.display = 'none'; 
        }, 500);
    }
};

// إضافة المنتجات إلى السلة
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productName = this.parentElement.querySelector('h3').innerText;
        const productPrice = parseFloat(this.parentElement.querySelector('p').innerText.replace('$', ''));

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            const product = { id: productId, name: productName, price: productPrice, quantity: 1 };
            cart.push(product);
        }
        updateCart();
        
        // إظهار رسالة المنبثقة
        showNotification(`${productName} added to cart`);
    });
});

// دالة لإظهار الرسالة المنبثقة
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.add('show');
    notification.style.display = 'block';

    // إخفاء الرسالة بعد 3 ثواني
    setTimeout(() => {
        notification.classList.remove('show');
        // إخفاء الرسالة بعد الانتهاء
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

// تحديث محتوى سلة المشتريات
function updateCart() {
    const cartContainer = document.getElementById('shopping-cart');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your shopping cart is empty..</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <p>${item.name} - ${item.price} $ ( quantity: ${item.quantity}) 
                <button class="increase" data-index="${index}">+</button>
                <button class="decrease" data-index="${index}">-</button>
                <button class="remove" data-index="${index}">Delete</button></p>
            `;
            cartContainer.appendChild(itemDiv);
        });

        // إضافة حدث لزيادة كمية المنتجات
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart[index].quantity++;
                updateCart();
            });
        });

        // إضافة حدث لتقليل كمية المنتجات
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        // إضافة حدث لحذف المنتج
        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });

        // إضافة حدث لحذف جميع المنتجات
        document.getElementById('clear-cart').addEventListener('click', function() {
            cart = [];
            updateCart();
        });
    }
}

// إخفاء اللودر بعد تحميل الصفحة
window.onload = function() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
};

document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll('.product');
    products.forEach((product, index) => {
        product.style.animationDelay = `${index * 0.1}s`;
    });
});

document.addEventListener("scroll", function() {
    const sidebar = document.querySelector('.sidebar');
    const sectionTwo = document.querySelector('#products');

    // الحصول على موضع القسم بالنسبة لنافذة العرض
    const sectionRect = sectionTwo.getBoundingClientRect();

    // تحقق مما إذا كان الجزء العلوي من القسم قد ظهر في نافذة العرض
    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
        sidebar.classList.add('top');
    } else {
        sidebar.classList.remove('top');
    }
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const notification = document.getElementById('message-notification');
    
    // إظهار الإشعار
    notification.classList.add('show');
    notification.classList.remove('hide');
    notification.style.display = 'block';

    // تأخير لإضافة فئة "hide" بعد 3 ثواني
    setTimeout(function() {
        notification.classList.add('hide');
    }, 3000);

    // إخفاء الإشعار بعد انتهاء تأثير التلاشي
    setTimeout(function() {
        notification.classList.remove('show');
        notification.style.display = 'none';
    }, 3500);
    this.reset();
});

// إضافة تأثير التمرير السلس لجميع الروابط في الشريط الجانبي
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault(); 
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});