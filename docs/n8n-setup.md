# N8N & Server Setup Guide

## 1. Remote SQLite Database (VPS)

On your Hetzner VPS, create a directory for your database and the database file itself.

```bash
# SSH into your VPS
mkdir -p /home/user/n8n_data
cd /home/user/n8n_data

# Install sqlite3 if not present
sudo apt-get install sqlite3

# Create the database and table
sqlite3 bills.db
```

Paste the following SQL into the `sqlite3` prompt:

```sql
CREATE TABLE IF NOT EXISTS pending_bills (
    id TEXT PRIMARY KEY,
    recipient TEXT NOT NULL,
    amount REAL,
    currency TEXT DEFAULT 'USD',
    due_date TEXT, -- ISO8601 string
    status TEXT DEFAULT 'new', -- 'new' or 'synced'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Type `.exit` to leave sqlite3.

## 2. N8N Configuration

Ensure your n8n instance (Docker or npm) has access to `/home/user/n8n_data`.
If using Docker, map the volume:
`-v /home/user/n8n_data:/data/n8n_data`

### Workflow A: Email Ingest (Gmail -> SQLite)

1.  **Trigger**: **IMAP / Gmail Node**. Set to specific Label or Subject filter (e.g. "Bill").
2.  **Parser**: **LLM / AI Agent Node** (or Regex).
    *   System Prompt: "Extract bill details: recipient, amount (number), currency, due_date (YYYY-MM-DD)."
    *   Output: JSON `{ recipient, amount, currency, due_date }`.
3.  **Action**: **SQLite Node**.
    *   Operation: `Insert`.
    *   Table: `pending_bills`.
    *   Columns: Map the extracted fields. Generate a unique `id` (e.g., UUID or MessageID).

### Workflow B: App Sync API (Webhook -> SQLite)

1.  **Trigger**: **Webhook Node**.
    *   Method: `GET`.
    *   Path: `/sync-bills`.
    *   Authentication: Recommend adding Header Auth.
2.  **Action**: **SQLite Node**.
    *   Operation: `Execute Query`.
    *   Query: `SELECT * FROM pending_bills WHERE status = 'new';`
3.  **Action** (Optional but recommended): **SQLite Node**.
    *   Operation: `Execute Query`.
    *   Query: `UPDATE pending_bills SET status = 'synced' WHERE status = 'new';`
    *   *Note: This marks them as synced immediately upon fetch.*
4.  **Response**: **Respond to Webhook Node**.
    *   Respond With: JSON.
    *   Body: Reference the Output of Step 2 (the SELECT query).

## 3. App Configuration

In `lib/api/n8nService.ts`, update `N8N_WEBHOOK_URL` to point to your actual N8N instance:
`https://your-n8n-domain.com/webhook/sync-bills`
