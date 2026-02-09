/**
 * Excel Export Service
 * Generates Excel files from task data using ExcelJS (secure alternative to xlsx)
 * React Native compatible
 */

import { getTaskStatus } from '@/lib/taskUtils';
import { Task } from '@/types/task';
import { logError, logInfo } from '@/utils/errorHandler';
// Import legacy API to resolve deprecation warning
import * as FileSystem from 'expo-file-system/legacy';

// Buffer and ExcelJS removed - switching to CSV for stability

/**
 * Export tasks to CSV file (Excel compatible)
 * @param tasks - Array of tasks to export
 * @returns File URI of the generated CSV file
 */
export async function exportTasksToExcel(tasks: Task[]): Promise<string> {
  try {
    logInfo('csvExport', `Starting CSV export for ${tasks.length} tasks`);
    
    // Define headers
    const headers = [
      'ID',
      'Title',
      'Description',
      'Priority',
      'Status',
      'Due Date',
      'Contact Name',
      'Contact Phone',
      'Contact Email',
      'Address',
      'Created At',
      'Updated At'
    ];
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    // Helper to escape CSV fields
    const escapeCsvField = (field: any): string => {
      if (field === null || field === undefined) return '';
      const stringValue = String(field);
      // If contains comma, quote, or newline, wrap in quotes and escape quotes
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    tasks.forEach(task => {
      const status = getTaskStatus(task);
      const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
      
      const row = [
        task.id,
        task.title,
        task.description || '',
        task.priority.toUpperCase(),
        statusLabel,
        task.dueDate ? new Date(task.dueDate).toLocaleString() : '',
        task.contact?.fullName || '',
        task.contact?.phone || '',
        task.contact?.email || '',
        task.taskAddress || task.contact?.address || '',
        new Date(task.createdAt).toLocaleString(),
        new Date(task.updatedAt).toLocaleString(),
      ].map(escapeCsvField);
      
      csvContent += row.join(',') + '\n';
    });
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const timeStr = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    const fileName = `Tasks_Export_${timestamp}_${timeStr}.csv`;
    
    // Save using expo-file-system legacy API
    const cacheDir = FileSystem.cacheDirectory;
    if (!cacheDir) {
        throw new Error('Cache directory is not available');
    }
    
    const fileUri = cacheDir + fileName;
    await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
    
    logInfo('csvExport', `CSV file created: ${fileName}`);
    logInfo('csvExport', `File URI: ${fileUri}`);
    
    return fileUri;
  } catch (error) {
    logError('csvExport', error);
    throw new Error('Failed to generate CSV file: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

/**
 * Get file name from URI
 */
export function getFileNameFromUri(uri: string): string {
  return uri.split('/').pop() || 'tasks_export.csv';
}
