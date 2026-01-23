/**
 * Error Handler Utility
 * Provides production-safe error handling with development logging
 */

import { Alert } from 'react-native';

/**
 * Check if app is running in development mode
 */
export const isDevelopment = __DEV__;

/**
 * Check if app is running in production mode
 */
export const isProduction = !__DEV__;

/**
 * Log error to console (only in development)
 */
export function logError(context: string, error: unknown): void {
  if (isDevelopment) {
    console.error(`❌ [${context}]`, error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
  }
  // In production, you could send to error tracking service here
  // e.g., Sentry, Firebase Crashlytics, etc.
}

/**
 * Log info to console (only in development)
 */
export function logInfo(context: string, message: string, data?: any): void {
  if (isDevelopment) {
    console.log(`ℹ️ [${context}]`, message, data || '');
  }
}

/**
 * Log success to console (only in development)
 */
export function logSuccess(context: string, message: string): void {
  if (isDevelopment) {
    console.log(`✅ [${context}]`, message);
  }
}

/**
 * Show user-friendly error alert
 * @param title - Alert title (should be translated)
 * @param message - Error message (should be translated)
 * @param error - Original error (logged in dev, hidden in prod)
 */
export function showErrorAlert(
  title: string,
  message: string,
  error?: unknown
): void {
  // Log to console in development
  if (error) {
    logError('User Alert', error);
  }
  
  // Show user-friendly alert
  Alert.alert(title, message);
}

/**
 * Get user-friendly error message from error object
 * @param error - Error object
 * @param fallbackMessage - Fallback message if error is unknown
 */
export function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof Error) {
    // In production, don't expose technical error messages
    if (isProduction) {
      return fallbackMessage;
    }
    return error.message;
  }
  return fallbackMessage;
}

/**
 * Disable yellow box warnings in production
 */
export function configureErrorHandling(): void {
  if (isProduction) {
    // Disable all console logs in production
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.debug = () => {};
    
    // Disable yellow box warnings
    if (typeof console.disableYellowBox !== 'undefined') {
      console.disableYellowBox = true;
    }
  }
}
