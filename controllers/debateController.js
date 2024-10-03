const { getDebaterResponse } = require('../services/debaters');
const { getRefereeScore } = require('../services/referee');

// Controller function to manage the debate process
async function startDebate(req, res) {
  const { debater1, debater2, referee1, referee2, topic } = req.body;
  let debateResults = [];
  
  let debater1TotalScore = 0;
  let debater2TotalScore = 0;

  // Simulate 5 rounds of debate between debater1 and debater2
  for (let i = 0; i < 5; i++) {
    const argument1 = await getDebaterResponse(debater1, topic);
    const argument2 = await getDebaterResponse(debater2, topic);

    // Both referees evaluate the arguments
    const referee1Result = await getRefereeScore(referee1, argument1, argument2);
    const referee2Result = await getRefereeScore(referee2, argument1, argument2);

    const debater1Score = (parseInt(referee1Result.debater1.score) || 0) + (parseInt(referee2Result.debater1.score) || 0);
    const debater2Score = (parseInt(referee1Result.debater2.score) || 0) + (parseInt(referee2Result.debater2.score) || 0);

    // Track total scores
    debater1TotalScore += debater1Score / 2;  // Average across both referees
    debater2TotalScore += debater2Score / 2;

    // Store the results of the current round
    debateResults.push({
      round: i + 1,
      argument1,
      argument2,
      referee1: {
        debater1: { score: referee1Result.debater1.score, remark: referee1Result.debater1.remark },
        debater2: { score: referee1Result.debater2.score, remark: referee1Result.debater2.remark }
      },
      referee2: {
        debater1: { score: referee2Result.debater1.score, remark: referee2Result.debater1.remark },
        debater2: { score: referee2Result.debater2.score, remark: referee2Result.debater2.remark }
      }
    });
  }

  // Determine the winner based on the average score, and use debater names from the request body
  let winner;
  if (debater1TotalScore > debater2TotalScore) {
    winner = req.body.debater1;  // Ensure the winner is the name of debater1
  } else if (debater2TotalScore > debater1TotalScore) {
    winner = req.body.debater2;  // Ensure the winner is the name of debater2
  } else {
    winner = "Tie";
  }

  // Return the results of the debate as a JSON response, including the winner
  res.json({
    debateResults,
    debater1TotalScore,
    debater2TotalScore,
    winner: winner  // Return the correct debater name as the winner
  });
}

module.exports = { startDebate };

