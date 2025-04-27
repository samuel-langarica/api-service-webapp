// Main JavaScript file
console.log('API Service Webapp initialized');

// Handle client-side routing
function handleRoute() {
    const path = window.location.pathname;
    const loginButton = document.querySelector('a[href="/login"]');
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('supabase.auth.token');
    
    if (isLoggedIn && loginButton) {
        loginButton.textContent = 'Panel de Usuario';
        loginButton.href = '/dashboard';
    }

    // Handle different routes
    switch (path) {
        case '/login':
            window.location.href = '/login.html';
            break;
        case '/docs':
            window.location.href = '/docs.html';
            break;
        case '/dashboard':
            window.location.href = '/dashboard.html';
            break;
        default:
            // Stay on the current page
            break;
    }
}

// Initialize routing
document.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('popstate', handleRoute); 