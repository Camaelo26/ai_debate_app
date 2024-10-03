const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Groq = require("groq-sdk");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,  // Use the API key from environment variables
});
const gemmaGroq = new Groq({
  apiKey: process.env.GEMMA2_API_KEY,  // New API key for Gemma
});

async function getGPTResponse(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 1,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
}

async function getGeminiResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent([prompt], { maxTokens: 200});
  return result.response.text();
}

async function getLLaMAResponse(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 200,
      top_p: 1,
    });

    // Instead of using `for await`, we directly access the response
    const response = chatCompletion.choices[0]?.message?.content || "No response received from LLaMA";
    return response;

  } catch (error) {
    console.error("Error fetching LLaMA response:", error);
    throw new Error("Failed to get response from LLaMA.");
  }
}

async function getGemmaResponse(prompt) {
  const chatCompletion = await gemmaGroq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gemma2-9b-it",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
  });
  return chatCompletion.choices[0]?.message?.content;
}

module.exports = {
  getGPTResponse,
  getGeminiResponse,
  getLLaMAResponse,
  getGemmaResponse,  // Export the new Gemma response function
};
