export async function uploadToGoogleDrive(): Promise<{ id: string; webViewLink?: string }> {
  throw new Error('Google Drive export is only available in the native app.');
}

export async function uploadImageToGoogleDrive(): Promise<{ id: string; webViewLink?: string }> {
  throw new Error('Screenshot upload is only available in the native app.');
}
