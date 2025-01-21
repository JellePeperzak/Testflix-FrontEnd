import { google, drive_v3 } from 'googleapis';

const drive = google.drive({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY, // Replace with your API key
});

// Define the type for the image response
interface ImageLinkResponse {
  webContentLink: string;
}

export const getImageLink = async (fileId: string): Promise<string | null> => {
  try {
    const response = await drive.files.get({
      fileId,
      fields: 'webContentLink',
    });

    return response.data.webContentLink || null; // Return direct link to the image
  } catch (error) {
    console.error('Error fetching image link:', error);
    return null;
  }
};