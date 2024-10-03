const { getDebaterResponse } = require('../services/debaters');
const { getRefereeScore } = require('../services/referee');

// Controller function to manage the debate process
async function startDebate(req, res) {
  const { debater1, debater2, referee, topic } = req.body;
  let debateResults = [];
  
  let debater1TotalScore = 0;
  let debater2TotalScore = 0;

  // Simulate 5 rounds of debate between debater1 and debater2
  for (let i = 0; i < 5; i++) {
    const argument1 = await getDebaterResponse(debater1, topic);
    const argument2 = await getDebaterResponse(debater2, topic);

    // Referee evaluates both arguments and gives a score and short remark
    const { debater1: debater1Result, debater2: debater2Result } = await getRefereeScore(referee, argument1, argument2);

    const debater1Score = parseInt(debater1Result.score) || 0;
    const debater2Score = parseInt(debater2Result.score) || 0;

    // Track total scores, ensuring that "N/A" gets treated as 0
    debater1TotalScore += debater1Score;
    debater2TotalScore += debater2Score;

    // Store the results of the current round
    debateResults.push({
      round: i + 1,
      argument1,
      argument2,
      debater1: { score: debater1Result.score, remark: debater1Result.remark },
      debater2: { score: debater2Result.score, remark: debater2Result.remark }
    });
  }

  // Determine the winner
  let winner;
  if (debater1TotalScore > debater2TotalScore) {
    winner = debater1;
  } else if (debater2TotalScore > debater1TotalScore) {
    winner = debater2;
  } else {
    winner = "Tie";
  }

  // Return the results of the debate as a JSON response, including the winner
  res.json({
    debateResults,
    debater1TotalScore,
    debater2TotalScore,
    winner: winner
  });
}

module.exports = { startDebate };
