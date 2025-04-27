// Main JavaScript file
console.log('API Service Webapp initialized');

// Add any global JavaScript functionality here
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('supabase.auth.token');
    const loginButton = document.querySelector('a[href="login.html"]');
    
    if (isLoggedIn && loginButton) {
        loginButton.textContent = 'Panel de Usuario';
        loginButton.href = 'dashboard.html';
    }
}); 