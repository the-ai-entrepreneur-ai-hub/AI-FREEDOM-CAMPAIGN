// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initCountdown();
    initStockCounter();
    initPurchaseNotifications();
    initScrollAnimations();
});

// 24-Hour Countdown Timer
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Set end time (24 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    function updateTimer() {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
            countdownElement.textContent = "00:00:00";
            return;
        }

        // Calculate hours, minutes, seconds
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Format and display
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Stock Counter with Realistic Depletion
function initStockCounter() {
    const stockElement = document.getElementById('stock');
    if (!stockElement) return;

    let stock = parseInt(stockElement.textContent) || 17;
    const initialStock = stock;

    function updateStock() {
        // More realistic depletion - slows down as stock gets lower
        const depletionRate = Math.max(1, Math.ceil(stock / initialStock * 3));
        stock -= Math.floor(Math.random() * depletionRate);
        
        // Ensure we don't go below 0
        stock = Math.max(0, stock);
        stockElement.textContent = stock;

        // Change color when low
        if (stock < 5) {
            stockElement.style.color = '#ef4444';
            stockElement.style.fontWeight = 'bold';
        }

        // Stop when sold out
        if (stock <= 0) {
            clearInterval(stockInterval);
            stockElement.textContent = "SOLD OUT!";
        }
    }

    // Update every 30-90 seconds randomly
    const stockInterval = setInterval(updateStock, 30000 + Math.random() * 60000);
}

// Purchase Notifications
function initPurchaseNotifications() {
    const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Japan', 'India', 'Brazil', 'Mexico'];
    const names = {
        male: ['John', 'Michael', 'David', 'James', 'Robert', 'William', 'Richard', 'Joseph', 'Thomas', 'Daniel'],
        female: ['Mary', 'Jennifer', 'Lisa', 'Sarah', 'Karen', 'Nancy', 'Betty', 'Sandra', 'Margaret', 'Emily']
    };

    function showNotification() {
        const isMale = Math.random() > 0.5;
        const nameList = isMale ? names.male : names.female;
        const name = nameList[Math.floor(Math.random() * nameList.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const avatarGender = isMale ? 'men' : 'women';
        const avatarId = Math.floor(Math.random() * 99) + 1;

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'purchase-notification animate';
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', 'polite');
        notification.innerHTML = `
            <div class="notification-content">
                <img src="https://randomuser.me/api/portraits/${avatarGender}/${avatarId}.jpg" 
                     class="notification-avatar" 
                     alt="${name}'s profile picture"
                     width="40"
                     height="40"
                     loading="lazy">
                <div class="notification-text">
                    <strong>${name}</strong> from ${country} just purchased!
                </div>
            </div>`;

        // Add to page
        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // Show first notification after 10s, then every 20-40s
    setTimeout(() => {
        showNotification();
        setInterval(showNotification, 20000 + Math.random() * 20000);
    }, 10000);
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.benefit, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(el => observer.observe(el));
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
