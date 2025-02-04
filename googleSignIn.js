// googleSignIn.js

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to verify the Google ID token
async function verifyToken(token) {
  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Client ID from your Google Developer Console
    });
    
    // If the token is valid, extract the user's information
    const payload = ticket.getPayload();
    return payload;  // You can return the user's data or store it
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

module.exports = { verifyToken };
