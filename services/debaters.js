const { getGPTResponse, getGeminiResponse, getLLaMAResponse, getGemmaResponse, getMixtralresponse,getGroqLLamaResponse } = require('../utils/apiKeys');
const { sharedLogic } = require('../utils/common'); // Example shared logic if needed

// Fetch debater's response based on the selected API
async function getDebaterResponse(debater, topic) {
  if (debater === "GPT-4") {
    return await getGPTResponse(topic); // Using OpenAI GPT-4
  } else if (debater === "Gemini") {
    return await getGeminiResponse(topic); // Using Gemini API
  } else if (debater === "LLaMA") {
    return await getLLaMAResponse(topic); // Using LLaMA API
  } else if (debater === "Gemma") {
    return await getGemmaResponse(topic); // Using Gemma API
  } else if (debater === "Mixtral") {
    return await getMixtralresponse(topic); // Using mixtral API
  } else if (debater === "GroqLlama") {
    return await getGroqLLamaResponse(topic); // Using mixtral API
  }
}

module.exports = { getDebaterResponse };
