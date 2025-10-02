// Sample jewelry data
const jewelryData = [

    {
        id: 2,
        name: "Pearl Drop Earrings",
        category: "earring",
        price: 450,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(1).JPG",
        description: "Classic pearl drop earrings in sterling silver. Timeless elegance that complements any outfit."
    },
    {
        id: 3,
        name: "Gold Chain Necklace",
        category: "necklace",
        price: 850,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(2).JPG",
        description: "18k gold chain necklace with a delicate pendant. Perfect for layering or wearing alone."
    },
    {
        id: 4,
        name: "Tennis Bracelet",
        category: "bracelet",
        price: 1200,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(3).JPG",
        description: "Stunning tennis bracelet with cubic zirconia stones. Adds sparkle to any wrist."
    },
    {
        id: 5,
        name: "Ruby Engagement Ring",
        category: "ring",
        price: 3200,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(4).JPG",
        description: "Vintage-inspired ruby engagement ring with diamond accents in yellow gold setting."
    },
    {
        id: 6,
        name: "Crystal Chandelier Earrings",
        category: "earring",
        price: 320,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(5).JPG",
        description: "Glamorous chandelier earrings with crystal drops. Perfect for evening events and parties."
    },
    {
        id: 7,
        name: "Layered Chain Necklace",
        category: "necklace",
        price: 680,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(6).JPG",
        description: "Trendy layered chain necklace in rose gold. Modern design for contemporary style."
    },
    {
        id: 8,
        name: "Charm Bracelet",
        category: "bracelet",
        price: 420,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(7).JPG",
        description: "Customizable charm bracelet in sterling silver. Add your favorite charms to make it unique."
    },
    {
        id: 9,
        name: "Emerald Cocktail Ring",
        category: "ring",
        price: 1850,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(8).JPG",
        description: "Bold emerald cocktail ring surrounded by diamonds. Statement piece for special occasions."
    },
    {
        id: 10,
        name: "Hoop Earrings",
        category: "earring",
        price: 180,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(9).JPG",
        description: "Classic gold hoop earrings in medium size. Versatile and perfect for everyday wear."
    },
    {
        id: 11,
        name: "Statement Necklace",
        category: "necklace",
        price: 750,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(10).JPG",
        description: "Bold statement necklace with geometric design. Perfect centerpiece for any outfit."
    },
    {
        id: 12,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(11).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 13,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(12).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 14,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(13).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 15,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(14).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 16,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(15).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 17,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(16).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 18,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(17).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 19,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(18).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 20,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(19).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 21,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(20).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 22,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(21).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 23,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(22).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 24,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(23).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 25,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(24).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    },
    {
        id: 26,
        name: "Diamond Tennis Bracelet",
        category: "bracelet",
        price: 2800,
        image: "file:///C:/Users/AJAKUM/OneDrive%20-%20Barco%20N.V/Pictures/jewels/pic%20(25).JPG",
        description: "Luxurious diamond tennis bracelet in white gold. Premium quality for special moments."
    }
];

// DOM elements
const jewelryGrid = document.getElementById('jewelryGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('itemModal');
const modalClose = document.getElementById('modalClose');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Modal elements
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const shareWhatsApp = document.getElementById('shareWhatsApp');
const copyLink = document.getElementById('copyLink');

// State
let currentFilter = 'all';
let currentSearch = '';
let currentItem = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        displayJewelry(jewelryData);
    }, 1000);
    
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });
    
    // Modal functionality
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // WhatsApp share
    shareWhatsApp.addEventListener('click', shareOnWhatsApp);
    
    // Copy link
    copyLink.addEventListener('click', copyItemLink);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Display jewelry items
function displayJewelry(items) {
    jewelryGrid.innerHTML = '';
    
    if (items.length === 0) {
        showNoResults();
        return;
    }
    
    hideNoResults();
    
    items.forEach((item, index) => {
        const jewelryItem = createJewelryItem(item, index);
        jewelryGrid.appendChild(jewelryItem);
    });
}

// Create jewelry item element
function createJewelryItem(item, index) {
    const itemElement = document.createElement('div');
    itemElement.className = 'jewelry-item';
    itemElement.style.animationDelay = `${index * 0.1}s`;
    
    itemElement.innerHTML = `
        <div class="jewelry-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="jewelry-category">${item.category}</div>
            <button class="share-btn" onclick="shareItem(${item.id}, event)">
                <i class="fab fa-whatsapp"></i>
            </button>
        </div>
        <div class="jewelry-info">
            <h3 class="jewelry-title">${item.name}</h3>
            <div class="jewelry-price">$${item.price.toLocaleString()}</div>
            <p class="jewelry-description">${item.description.substring(0, 80)}...</p>
        </div>
    `;
    
    itemElement.addEventListener('click', () => openModal(item));
    
    return itemElement;
}

// Search functionality
function handleSearch(e) {
    currentSearch = e.target.value.toLowerCase();
    filterAndDisplayItems();
}

// Filter functionality
function handleFilter(e) {
    const category = e.target.dataset.category;
    
    // Update active filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    currentFilter = category;
    filterAndDisplayItems();
}

// Filter and display items based on current search and filter
function filterAndDisplayItems() {
    let filteredItems = jewelryData;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === currentFilter);
    }
    
    // Apply search filter
    if (currentSearch) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(currentSearch) ||
            item.description.toLowerCase().includes(currentSearch) ||
            item.category.toLowerCase().includes(currentSearch)
        );
    }
    
    displayJewelry(filteredItems);
}

// Modal functionality
function openModal(item) {
    currentItem = item;
    
    modalImage.src = item.image;
    modalImage.alt = item.name;
    modalTitle.textContent = item.name;
    modalCategory.textContent = item.category.toUpperCase();
    modalPrice.textContent = `$${item.price.toLocaleString()}`;
    modalDescription.textContent = item.description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentItem = null;
}

// WhatsApp sharing
function shareOnWhatsApp() {
    if (!currentItem) return;
    
    const message = `Check out this beautiful ${currentItem.name}!\n\n` +
                   `💎 ${currentItem.name}\n` +
                   `💰 Price: $${currentItem.price.toLocaleString()}\n` +
                   `📝 ${currentItem.description}\n\n` +
                   `Visit our jewelry collection: ${window.location.href}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    showToast('Opening WhatsApp...');
}

// Quick share from grid
function shareItem(itemId, event) {
    event.stopPropagation();
    
    const item = jewelryData.find(i => i.id === itemId);
    if (!item) return;
    
    const message = `Check out this beautiful ${item.name}!\n\n` +
                   `💎 ${item.name}\n` +
                   `💰 Price: $${item.price.toLocaleString()}\n` +
                   `📝 ${item.description}\n\n` +
                   `Visit our jewelry collection: ${window.location.href}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    showToast('Opening WhatsApp...');
}

// Copy link functionality
function copyItemLink() {
    if (!currentItem) return;
    
    const itemUrl = `${window.location.href}#item-${currentItem.id}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(itemUrl).then(() => {
            showToast('Link copied to clipboard!');
        }).catch(() => {
            fallbackCopyText(itemUrl);
        });
    } else {
        fallbackCopyText(itemUrl);
    }
}

// Fallback copy function for older browsers
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Link copied to clipboard!');
    } catch (err) {
        showToast('Failed to copy link', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Loading states
function showLoading() {
    loading.style.display = 'flex';
    jewelryGrid.style.display = 'none';
    noResults.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
    jewelryGrid.style.display = 'grid';
}

function showNoResults() {
    noResults.style.display = 'block';
    jewelryGrid.style.display = 'none';
}

function hideNoResults() {
    noResults.style.display = 'none';
    jewelryGrid.style.display = 'grid';
}

// URL hash handling for direct item links
function handleHashChange() {
    const hash = window.location.hash;
    if (hash.startsWith('#item-')) {
        const itemId = parseInt(hash.replace('#item-', ''));
        const item = jewelryData.find(i => i.id === itemId);
        if (item) {
            openModal(item);
        }
    }
}

// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top functionality when clicking on logo
document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
});

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Add to favorites functionality (localStorage)
let favorites = JSON.parse(localStorage.getItem('jewelry-favorites')) || [];

function toggleFavorite(itemId) {
    const index = favorites.indexOf(itemId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        favorites.push(itemId);
        showToast('Added to favorites');
    }
    
    localStorage.setItem('jewelry-favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        const itemId = parseInt(btn.dataset.itemId);
        btn.classList.toggle('active', favorites.includes(itemId));
    });
}

// Performance optimization: Debounce search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const debouncedSearch = debounce(handleSearch, 300);
searchInput.removeEventListener('input', handleSearch);
searchInput.addEventListener('input', debouncedSearch);