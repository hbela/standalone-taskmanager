/**
 * Excel Export Service
 * Generates Excel files from task data using xlsx (SheetJS)
 * React Native compatible
 */

import { getTaskStatus } from '@/lib/taskUtils';
import { Task } from '@/types/task';
import { File, Paths } from 'expo-file-system';
import * as XLSX from 'xlsx';

/**
 * Export tasks to Excel file
 * @param tasks - Array of tasks to export
 * @returns File URI of the generated Excel file
 */
export async function exportTasksToExcel(tasks: Task[]): Promise<string> {
  try {
    console.log('📊 Starting Excel export for', tasks.length, 'tasks');
    
    // Prepare data for Excel
    const data = tasks.map(task => {
      const status = getTaskStatus(task);
      const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
      
      return {
        'ID': task.id,
        'Title': task.title,
        'Description': task.description || '',
        'Priority': task.priority.toUpperCase(),
        'Status': statusLabel,
        'Due Date': task.dueDate ? new Date(task.dueDate).toLocaleString() : '',
        'Contact Name': task.contact?.fullName || '',
        'Contact Phone': task.contact?.phone || '',
        'Contact Email': task.contact?.email || '',
        'Address': task.taskAddress || task.contact?.address || '',
        'Created At': new Date(task.createdAt).toLocaleString(),
        'Updated At': new Date(task.updatedAt).toLocaleString(),
      };
    });
    
    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Set column widths
    const columnWidths = [
      { wch: 8 },  // ID
      { wch: 30 }, // Title
      { wch: 50 }, // Description
      { wch: 12 }, // Priority
      { wch: 12 }, // Status
      { wch: 20 }, // Due Date
      { wch: 25 }, // Contact Name
      { wch: 18 }, // Contact Phone
      { wch: 30 }, // Contact Email
      { wch: 40 }, // Address
      { wch: 20 }, // Created At
      { wch: 20 }, // Updated At
    ];
    worksheet['!cols'] = columnWidths;
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    
    // Generate Excel file as base64
    const excelBuffer = XLSX.write(workbook, { 
      type: 'base64',
      bookType: 'xlsx'
    });
    
    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const timeStr = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    const fileName = `Tasks_Export_${timestamp}_${timeStr}.xlsx`;
    
    // Save file using expo-file-system
    const file = new File(Paths.cache, fileName);
    await file.write(excelBuffer, { encoding: 'base64' });
    
    console.log('✅ Excel file created:', fileName);
    console.log('📁 File URI:', file.uri);
    
    return file.uri;
  } catch (error) {
    console.error('❌ Excel Export Error:', error);
    throw new Error('Failed to generate Excel file: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}

/**
 * Get file name from URI
 */
export function getFileNameFromUri(uri: string): string {
  return uri.split('/').pop() || 'tasks_export.xlsx';
}
