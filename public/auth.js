import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Supabase configuration
const SUPABASE_URL = 'https://vpfmuzipirbjrdwlrpsp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZm11emlwaXJianJkd2xycHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MjExOTAsImV4cCI6MjA2MTE5NzE5MH0.TZ5AK9wTTABp2KTfnckslYrTw1IWwEQxDr49IGMCNSo';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check if user is authenticated
export async function checkAuth() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
            console.error('Error checking auth:', error.message);
            return false;
        }
        return !!session;
    } catch (error) {
        console.error('Error in checkAuth:', error);
        return false;
    }
}

// Login function
export async function login(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw new Error(error.message);
        }

        // Store the session
        if (data.session) {
            localStorage.setItem('supabase.auth.token', data.session.access_token);
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Logout function
export async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        // Clear the stored session
        localStorage.removeItem('supabase.auth.token');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

// Get current user
export async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            throw error;
        }
        return user;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

// Protect routes
export async function protectRoute() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        window.location.href = 'login.html';
    }
} 