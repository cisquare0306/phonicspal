```javascript
export default async function handler(req, res) {
  // Only allow POST requests from our game
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Read what the game is asking for (words, images, or voice)
  const { endpoint, payload } = req.body;
  
  // Grab the hidden API key from Vercel's secure vault
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server API Key is missing in Vercel settings!" });
  }

  try {
    // Forward the request securely to Google
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    // Send the response back to the HTML game
    res.status(200).json(data);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: error.message });
  }
}


```
