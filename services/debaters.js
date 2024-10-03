const { getGPTResponse } = require('../utils/apiKeys');
const { getGeminiResponse } = require('../utils/apiKeys');
const { getLLaMAResponse } = require('../utils/apiKeys');
const { sharedLogic } = require('../utils/common'); // Example shared logic if needed

// Fetch debater's response based on the selected API
async function getDebaterResponse(debater, topic) {
  if (debater === "GPT-4") {
    return await getGPTResponse(topic); // Using OpenAI GPT-4
  } else if (debater === "Gemini") {
    return await getGeminiResponse(topic); // Using Gemini API
  } else if (debater === "LLaMA") {
    return await getLLaMAResponse(topic); // Using LLaMA API
  }
}

module.exports = { getDebaterResponse };
