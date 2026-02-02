/**
 * n8n Service
 * Handles communication with the remote n8n instance for bill synchronization
 */

export interface RemoteBill {
  id: string; // Remote unique ID (e.g. from the n8n SQLite DB)
  recipient: string;
  amount: number;
  currency: string;
  due_date: string; // ISO Date string
  status: 'new' | 'synced';
}

// Replace this with your actual N8N Webhook URL
// In production, this should come from an environment variable or settings
const N8N_WEBHOOK_URL = 'https://YOUR_N8N_INSTANCE_URL/webhook/sync-bills';

export async function fetchRemoteBills(): Promise<RemoteBill[]> {
  try {
    // In a real scenario, you probably want to store the URL in settings
    // For now, we'll check if the URL is the placeholder
    if (N8N_WEBHOOK_URL.includes('YOUR_N8N_INSTANCE_URL')) {
        console.warn('n8n Webhook URL is not configured. Returning empty list.');
        return [];
    }

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'X-Auth-Token': 'YOUR_SECRET_TOKEN' // Add auth if your n8n webhook requires it
      },
    });

    if (!response.ok) {
      throw new Error(`n8n sync failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate we got an array
    if (!Array.isArray(data)) {
        console.error('n8n response is not an array:', data);
        return [];
    }

    return data as RemoteBill[];
  } catch (error) {
    console.error('Error fetching remote bills:', error);
    // Return empty list so we don't break the app flow, just fail to sync
    return [];
  }
}
