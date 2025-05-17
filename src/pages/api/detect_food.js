export const runtime = "experimental-edge";

export const config = {
  api: {
    responseLimit: "100mb",
  },
};

// Function to detect food and calories from a base64 encoded image
async function detectFoodAndCalories(base64Image) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
  const model = "gemini-2.5-flash-preview-04-17"; // Specified model for detection
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Extract MIME type and pure base64 data from the image string
  const match = base64Image.match(/^data:(image\/\w+);base64,(.*)$/);
  if (!match) {
    throw new Error("Invalid image data format.");
  }

  const mimeType = match[1];
  const base64Data = match[2];

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: 'Identify the food in this picture and provide detailed nutritional information in JSON format. Include the following: food items, total calories, protein (g), fat (g), carbohydrates (g), fiber (g), sugar (g), and sodium (mg). Also suggest 2-3 similar healthy alternatives. Return only valid JSON in this format: {"items": ["food1", "food2"], "total_calories": number, "protein": number, "fat": number, "carbs": number, "fiber": number, "sugar": number, "sodium": number, "healthy_alternatives": ["alternative1", "alternative2"]}',
          },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data,
            },
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        `API call failed with status: ${
          response.status
        }, ${await response.text()}`
      );
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const regex = /\{.*?\}/s; // The 's' flag allows '.' to match newline characters
    const match = text.match(regex);

    if (!match) {
      throw new Error("No valid JSON found in the response.");
    }

    const jsonStr = match[0];
    const parsedData = JSON.parse(jsonStr);

    // Return the extracted data from the parsed JSON
    return {
      items: parsedData.items || [],
      count: parsedData.total_calories || 0,
      nutrition: {
        protein: parsedData.protein || 0,
        fat: parsedData.fat || 0,
        carbs: parsedData.carbs || 0,
        fiber: parsedData.fiber || 0,
        sugar: parsedData.sugar || 0,
        sodium: parsedData.sodium || 0,
      },
      alternatives: parsedData.healthy_alternatives || [],
    };
  } catch (error) {
    console.error("API call failed:", error);
    throw new Error(`Failed to detect food and calories: ${error.message}`);
  }
}

// Handler for the Cloudflare Worker
export default async function handler(req) {
  if (req.method === "POST") {
    try {
      const { image } = await req.json(); // Parse the image from the POST request's body
      const { items, count, nutrition, alternatives } =
        await detectFoodAndCalories(image);

      // Create and return a successful response
      return new Response(
        JSON.stringify({
          items,
          count,
          nutrition,
          alternatives,
          success: true,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    } catch (error) {
      // Create and return an error response
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
  } else {
    // Return a 405 Method Not Allowed response for non-POST requests
    return new Response(`Method ${req.method} Not Allowed`, {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}
