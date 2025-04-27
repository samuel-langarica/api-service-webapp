import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Supabase configuration
const SUPABASE_URL = 'https://vpfmuzipirbjrdwlrpsp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZm11emlwaXJianJkd2xycHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MjExOTAsImV4cCI6MjA2MTE5NzE5MH0.TZ5AK9wTTABp2KTfnckslYrTw1IWwEQxDr49IGMCNSo';

// API configuration
const API_BASE_URL = 'https://api-as-a-service-template-zavwr.kinsta.app/api/v1';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get user data from Supabase
export async function getUserData() {
    try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error('No user found');

        // Get API token and subscription info
        const { data: apiToken, error: tokenError } = await supabase
            .from('api_tokens')
            .select(`
                token,
                monthly_usage_count,
                subscription_types (
                    name,
                    description,
                    monthly_quota,
                    allowed_endpoints
                )
            `)
            .eq('user_id', user.id)
            .single();

        if (tokenError) throw tokenError;
        if (!apiToken) throw new Error('No API token found');

        // Calculate remaining API calls
        const remainingCalls = apiToken.subscription_types.monthly_quota - apiToken.monthly_usage_count;

        return {
            apiToken: apiToken.token,
            subscriptionType: apiToken.subscription_types.name,
            subscriptionDescription: apiToken.subscription_types.description,
            monthlyQuota: apiToken.subscription_types.monthly_quota,
            monthlyUsage: apiToken.monthly_usage_count,
            remainingCalls: remainingCalls,
            allowedEndpoints: apiToken.subscription_types.allowed_endpoints
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Make an API request
export async function makeApiRequest(endpoint, method = 'GET', body = null) {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session) throw new Error('No active session');

        const { data: apiToken, error: tokenError } = await supabase
            .from('api_tokens')
            .select('token')
            .eq('user_id', session.user.id)
            .single();

        if (tokenError) throw tokenError;
        if (!apiToken) throw new Error('No API token found');

        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${apiToken.token}`,
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
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
} 