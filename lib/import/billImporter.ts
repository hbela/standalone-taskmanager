/**
 * Bill Importer
 * Handles the logic of fetching remote bills and converting them into Tasks
 */

import { fetchRemoteBills } from '../api/n8nService';
import { createTask } from '../db/tasksDb';

export async function syncBills(): Promise<{ added: number; errors: number }> {
    console.log('Starting bill sync...');
    const bills = await fetchRemoteBills();
    
    if (bills.length === 0) {
        console.log('No new bills to sync.');
        return { added: 0, errors: 0 };
    }

    let addedCount = 0;
    let errorCount = 0;

    for (const bill of bills) {
        try {
            await createTask({
                title: `Bill: ${bill.recipient}`,
                description: `Imported via n8n. Recipient: ${bill.recipient}`,
                amount: bill.amount, // Note: Task type needs 'amount' or we map to 'bill'
                bill: bill.amount,
                billCurrency: bill.currency,
                dueDate: new Date(bill.due_date).toISOString(),
                priority: 'high', // Bills are usually important
                completed: false,
            } as any); // Type cast as necessary if Task input type is strict
            
            addedCount++;
        } catch (err) {
            console.error(`Failed to import bill from ${bill.recipient}:`, err);
            errorCount++;
        }
    }

    console.log(`Sync complete. Added: ${addedCount}, Errors: ${errorCount}`);
    return { added: addedCount, errors: errorCount };
}
