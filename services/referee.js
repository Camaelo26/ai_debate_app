const { getGPTResponse } = require('../utils/apiKeys');
const { getGeminiResponse } = require('../utils/apiKeys');
const { getLLaMAResponse } = require('../utils/apiKeys');

// Fetch referee's score based on the selected API (GPT-4, Gemini, LLaMA)
async function getRefereeScore(referee, argument1, argument2) {
  const debatePrompt = `Evaluate the arguments provided:
  
  Debater 1: ${argument1}
  Debater 2: ${argument2}
  
  Please give a score out of 10 for each debater and a short remark for each debater. Use this exact format:
  
  Debater 1 Score: [score]/10
  Remark: [remark]
  
  Debater 2 Score: [score]/10
  Remark: [remark]`;

  let refereeResponse;
  
  try {
    // Get response from the appropriate API
    if (referee === "GPT-4") {
      refereeResponse = await getGPTResponse(debatePrompt);
    } else if (referee === "Gemini") {
      refereeResponse = await getGeminiResponse(debatePrompt);
    } else if (referee === "LLaMA") {
      refereeResponse = await getLLaMAResponse(debatePrompt);
    }

    // Log the raw response for debugging
    console.log("Referee Response:", refereeResponse);

    // Updated regex to capture both whole and decimal scores
    const scoreRegex = /Debater 1 Score:\s*(\d+(\.\d+)?)\/10\s*Remark:\s*(.+)\s*Debater 2 Score:\s*(\d+(\.\d+)?)\/10\s*Remark:\s*(.+)/i;
    const match = scoreRegex.exec(refereeResponse);

    if (match) {
      const debater1Score = match[1] || "N/A";
      const debater1Remark = match[3] || "No remark";
      const debater2Score = match[4] || "N/A";
      const debater2Remark = match[6] || "No remark";

      return {
        debater1: { score: debater1Score, remark: debater1Remark },
        debater2: { score: debater2Score, remark: debater2Remark }
      };
    } else {
      // Fallback in case the regex doesn't match
      console.error("Score extraction failed. Response format may be incorrect.");
      return {
        debater1: { score: "0", remark: "No valid score" },
        debater2: { score: "0", remark: "No valid score" }
      };
    }
  } catch (error) {
    console.error("Error fetching referee response:", error);
    return {
      debater1: { score: "0", remark: "Error during evaluation" },
      debater2: { score: "0", remark: "Error during evaluation" }
    };
  }
}

module.exports = { getRefereeScore };
