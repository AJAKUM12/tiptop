// Admin Panel JavaScript

// Dynamic API URL based on current environment
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000/api'  // Development environment
    : `${window.location.origin}/api`;  // Production environment

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const jewelryTableBody = document.getElementById('jewelryTableBody');
const addNewBtn = document.getElementById('addNewBtn');
const saveDataBtn = document.getElementById('saveDataBtn');
const logoutBtn = document.getElementById('logoutBtn');
const searchAdmin = document.getElementById('searchAdmin');

// Modal Elements
const jewelryModal = document.getElementById('jewelryModal');
const modalTitle = document.getElementById('modalTitle');
const jewelryForm = document.getElementById('jewelryForm');
const modalClose = document.querySelector('#jewelryModal .close');
const cancelBtn = document.getElementById('cancelBtn');

// Confirmation Modal Elements
const confirmModal = document.getElementById('confirmModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Pagination Elements
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Login Elements
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Toast element
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// New Image Upload Elements
const imagePathInput = document.getElementById('image');
const imageFileInput = document.getElementById('imageFile');
const imagePreview = document.getElementById('imagePreview');
const uploadTabs = document.querySelectorAll('.upload-tab');
const uploadContents = document.querySelectorAll('.upload-content');
const uploadProgress = document.getElementById('uploadProgress');
const uploadStatus = document.getElementById('uploadStatus');

// State variables
let jewelryData = [];
let currentItemToDelete = null;
let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [];
let isAuthenticated = false;

// Check if user is already authenticated
function checkAuthentication() {
    const authToken = localStorage.getItem('adminAuthToken');
    
    if (authToken && authToken === 'admin-token-12345') {
        isAuthenticated = true;
        loginScreen.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadJewelryData();
    }
}

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Login
    loginBtn.addEventListener('click', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Add new item
    addNewBtn.addEventListener('click', openAddModal);
    
    // Save all data
    saveDataBtn.addEventListener('click', saveAllData);
    
    // Form submission
    jewelryForm.addEventListener('submit', handleFormSubmit);
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === jewelryModal) closeModal();
        if (e.target === confirmModal) closeConfirmModal();
    });
    
    // Delete confirmation
    cancelDeleteBtn.addEventListener('click', closeConfirmModal);
    confirmDeleteBtn.addEventListener('click', deleteJewelry);
    
    // Search functionality
    searchAdmin.addEventListener('input', handleSearch);
    
    // Pagination
    prevPageBtn.addEventListener('click', () => changePage(currentPage - 1));
    nextPageBtn.addEventListener('click', () => changePage(currentPage + 1));
    
    // Image upload related listeners
    setupImageUploadListeners();
}

// Setup image upload related event listeners
function setupImageUploadListeners() {
    // Switch between upload tabs
    uploadTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            uploadTabs.forEach(t => t.classList.remove('active'));
            uploadContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and its content
            this.classList.add('active');
            const target = this.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Handle file selection
    imageFileInput.addEventListener('change', handleImageSelect);
    
    // Path input change - show preview if it's a valid URL
    imagePathInput.addEventListener('input', function() {
        const path = this.value.trim();
        if (path) {
            imagePreview.src = path;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
    });
}

// Handle image file selection
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
    
    // Upload the file
    uploadImage(file);
}

// Upload image to server
async function uploadImage(file) {
    try {
        // Create form data
        const formData = new FormData();
        formData.append('image', file);
        
        // Reset progress and status
        uploadProgress.style.width = '0%';
        uploadStatus.textContent = 'Uploading...';
        
        // Upload with progress tracking
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', `${API_URL}/upload`, true);
        
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                uploadProgress.style.width = percentComplete + '%';
            }
        };
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                
                // Update image path input with the uploaded file path
                imagePathInput.value = response.filePath;
                
                // Switch to path tab
                uploadTabs[0].click();
                
                uploadStatus.textContent = 'Upload complete!';
                showToast('Image uploaded successfully!', 'success');
            } else {
                uploadStatus.textContent = 'Upload failed';
                showToast('Failed to upload image', 'error');
            }
        };
        
        xhr.onerror = function() {
            uploadStatus.textContent = 'Upload failed';
            showToast('Failed to upload image', 'error');
        };
        
        xhr.send(formData);
    } catch (error) {
        console.error('Error uploading image:', error);
        showToast('Failed to upload image', 'error');
    }
}

// Check if user is already authenticated
function checkAuthentication() {
    const authToken = localStorage.getItem('adminAuthToken');
    
    if (authToken && authToken === 'admin-token-12345') {
        isAuthenticated = true;
        loginScreen.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadJewelryData();
    }
}

// Initialize the admin panel
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Login
    loginBtn.addEventListener('click', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Add new item
    addNewBtn.addEventListener('click', openAddModal);
    
    // Save all data
    saveDataBtn.addEventListener('click', saveAllData);
    
    // Form submission
    jewelryForm.addEventListener('submit', handleFormSubmit);
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === jewelryModal) closeModal();
        if (e.target === confirmModal) closeConfirmModal();
    });
    
    // Delete confirmation
    cancelDeleteBtn.addEventListener('click', closeConfirmModal);
    confirmDeleteBtn.addEventListener('click', deleteJewelry);
    
    // Search functionality
    searchAdmin.addEventListener('input', handleSearch);
    
    // Pagination
    prevPageBtn.addEventListener('click', () => changePage(currentPage - 1));
    nextPageBtn.addEventListener('click', () => changePage(currentPage + 1));
    
    // Image upload related listeners
    setupImageUploadListeners();
}

// Setup image upload related event listeners
function setupImageUploadListeners() {
    // Switch between upload tabs
    uploadTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            uploadTabs.forEach(t => t.classList.remove('active'));
            uploadContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and its content
            this.classList.add('active');
            const target = this.dataset.target;
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Handle file selection
    imageFileInput.addEventListener('change', handleImageSelect);
    
    // Path input change - show preview if it's a valid URL
    imagePathInput.addEventListener('input', function() {
        const path = this.value.trim();
        if (path) {
            imagePreview.src = path;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
    });
}

// Handle image file selection
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    // Show preview
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
    
    // Upload the file
    uploadImage(file);
}

// Upload image to server
async function uploadImage(file) {
    try {
        // Create form data
        const formData = new FormData();
        formData.append('image', file);
        
        // Reset progress and status
        uploadProgress.style.width = '0%';
        uploadStatus.textContent = 'Uploading...';
        
        // Upload with progress tracking
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', `${API_URL}/upload`, true);
        
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                uploadProgress.style.width = percentComplete + '%';
            }
        };
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                
                // Update image path input with the uploaded file path
                imagePathInput.value = response.filePath;
                
                // Switch to path tab
                uploadTabs[0].click();
                
                uploadStatus.textContent = 'Upload complete!';
                showToast('Image uploaded successfully!', 'success');
            } else {
                uploadStatus.textContent = 'Upload failed';
                showToast('Failed to upload image', 'error');
            }
        };
        
        xhr.onerror = function() {
            uploadStatus.textContent = 'Upload failed';
            showToast('Failed to upload image', 'error');
        };
        
        xhr.send(formData);
    } catch (error) {
        console.error('Error uploading image:', error);
        showToast('Failed to upload image', 'error');
    }
}

// Login functionality
function handleLogin(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Simple authentication (in a real app, you'd use proper authentication)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuthToken', 'admin-token-12345');
        isAuthenticated = true;
        loginScreen.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadJewelryData();
        showToast('Login successful!', 'success');
    } else {
        showToast('Invalid username or password', 'error');
    }
}

// Logout functionality
function handleLogout() {
    localStorage.removeItem('adminAuthToken');
    isAuthenticated = false;
    adminDashboard.style.display = 'none';
    loginScreen.style.display = 'block';
    showToast('Logged out successfully', 'success');
}

// Load jewelry data from API
async function loadJewelryData() {
    try {
        showLoading();
        
        const response = await fetch(`${API_URL}/jewelry`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        jewelryData = await response.json();
        hideLoading();
        renderTable();
    } catch (error) {
        console.error('Error loading jewelry data:', error);
        hideLoading();
        showToast('Failed to load jewelry data. Make sure the server is running.', 'error');
    }
}

// Show loading indicator
function showLoading() {
    // Add a loading indicator to the table
    jewelryTableBody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 20px;">
                <div class="loading">
                    <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>
                    <p>Loading...</p>
                </div>
            </td>
        </tr>
    `;
}

// Hide loading indicator
function hideLoading() {
    // Will be replaced when renderTable is called
}

// Render the jewelry table
function renderTable() {
    // Apply search filter
    filteredData = jewelryData.filter(item => {
        const searchTerm = searchAdmin.value.toLowerCase();
        return !searchTerm || 
               item.name.toLowerCase().includes(searchTerm) ||
               item.category.toLowerCase().includes(searchTerm) ||
               item.description.toLowerCase().includes(searchTerm);
    });
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    // Update pagination controls
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Clear the table
    jewelryTableBody.innerHTML = '';
    
    // Create table rows
    pageData.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td><img src="${item.image}" alt="${item.name}" class="jewelry-image"></td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>Rs ${item.price.toLocaleString()}</td>
            <td class="action-buttons">
                <button class="btn" onclick="editJewelry(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn danger" onclick="confirmDelete(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        jewelryTableBody.appendChild(row);
    });
    
    // Show no data message if no items
    if (pageData.length === 0) {
        jewelryTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px;">
                    No jewelry items found.
                </td>
            </tr>
        `;
    }
}

// Change page in pagination
function changePage(newPage) {
    currentPage = newPage;
    renderTable();
}

// Search functionality
function handleSearch() {
    currentPage = 1; // Reset to first page on search
    renderTable();
}

// Open the edit jewelry modal
function editJewelry(id) {
    const item = jewelryData.find(item => item.id === id);
    if (!item) return;
    
    modalTitle.textContent = 'Edit Jewelry';
    
    document.getElementById('jewelryId').value = item.id;
    document.getElementById('name').value = item.name;
    document.getElementById('category').value = item.category;
    document.getElementById('price').value = item.price;
    document.getElementById('image').value = item.image;
    document.getElementById('description').value = item.description;
    
    // Show image preview if available
    if (item.image) {
        imagePreview.src = item.image;
        imagePreview.style.display = 'block';
    } else {
        imagePreview.style.display = 'none';
    }
    
    // Switch to path tab
    uploadTabs[0].click();
    
    jewelryModal.style.display = 'block';
}

// Open the add jewelry modal
function openAddModal() {
    modalTitle.textContent = 'Add New Jewelry';
    jewelryForm.reset();
    
    // Hide image preview
    imagePreview.style.display = 'none';
    
    // Switch to path tab
    uploadTabs[0].click();
    
    jewelryModal.style.display = 'block';
}

// Close the jewelry modal
function closeModal() {
    jewelryModal.style.display = 'none';
}

// Open delete confirmation modal
function confirmDelete(id) {
    currentItemToDelete = id;
    confirmModal.style.display = 'block';
}

// Close delete confirmation modal
function closeConfirmModal() {
    confirmModal.style.display = 'none';
    currentItemToDelete = null;
}

// Delete jewelry item
async function deleteJewelry() {
    if (currentItemToDelete === null) return;
    
    try {
        // Find the item to get its image path
        const item = jewelryData.find(item => item.id === currentItemToDelete);
        if (!item) {
            throw new Error('Item not found');
        }
        
        // Delete the item from the database
        const response = await fetch(`${API_URL}/jewelry/${currentItemToDelete}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // If the item has an image and it's in our images folder, delete the image file
        if (item.image && item.image.includes('./images/')) {
            try {
                await fetch(`${API_URL}/images?path=${encodeURIComponent(item.image)}`, {
                    method: 'DELETE'
                });
                console.log('Image deleted successfully');
            } catch (imageError) {
                console.error('Error deleting image:', imageError);
                // Continue even if image deletion fails
            }
        }
        
        // Remove item from local data
        const index = jewelryData.findIndex(item => item.id === currentItemToDelete);
        if (index !== -1) {
            jewelryData.splice(index, 1);
        }
        
        renderTable();
        showToast('Item deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting item:', error);
        showToast('Failed to delete item', 'error');
    }
    
    closeConfirmModal();
}

// Handle form submission (add/edit)
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('jewelryId').value) || null;
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = parseInt(document.getElementById('price').value);
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;
    
    // Create new item object
    const item = { id, name, category, price, image, description };
    
    try {
        let response;
        let method;
        let url = `${API_URL}/jewelry`;
        
        if (id) {
            // Update existing item
            method = 'PUT';
            url = `${url}/${id}`;
        } else {
            // Add new item
            method = 'POST';
        }
        
        response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const updatedItem = await response.json();
        
        // Update local data
        if (id) {
            const index = jewelryData.findIndex(i => i.id === id);
            if (index !== -1) {
                jewelryData[index] = updatedItem;
            }
            showToast('Item updated successfully', 'success');
        } else {
            jewelryData.push(updatedItem);
            showToast('Item added successfully', 'success');
        }
        
        // Close modal and refresh table
        closeModal();
        renderTable();
    } catch (error) {
        console.error('Error saving item:', error);
        showToast('Failed to save item', 'error');
    }
}

// Save all data to the server
async function saveAllData() {
    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jewelryData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        showToast('All changes saved successfully', 'success');
    } catch (error) {
        console.error('Error saving data:', error);
        showToast('Failed to save changes', 'error');
    }
}

// Show toast message
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions available globally
window.editJewelry = editJewelry;
window.confirmDelete = confirmDelete;
