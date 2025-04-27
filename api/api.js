// API configuration
const API_BASE_URL = 'https://api.example.com/v1';

// Get user data from the API
export async function getUserData() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/user`, {
        headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return await response.json();
}

// Make an API request
export async function makeApiRequest(endpoint, method = 'GET', body = null) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        throw new Error('No active session');
    }

    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
}

// Check API status
export async function checkApiStatus() {
    return makeApiRequest('/status');
}

// Get hello message
export async function getHelloMessage() {
    return makeApiRequest('/hello');
} 