# AI-Powered Debate System

## Overview
The AI-Powered Debate System allows users to simulate debates between different AI models like GPT-4, Gemini, LLaMA, and Gemma. Users can create custom debate scenarios, select debaters and referees, and view results after multiple rounds of argumentation. The system leverages multiple AI APIs to generate debate responses and evaluate the performance of each debater based on referee scores and remarks.

## Features
- **Multiple AI Models**: Support for GPT-4, Gemini, LLaMA, Gemma, Mixtral, and GroqLlama for generating debate arguments.
- **Customizable Debates**: Users can define the debate topic, assign roles (e.g., defend Islam, defend Christianity), and select AI debaters.
- **AI Referees**: AI models evaluate the debates and provide scores and remarks based on the strength and coherence of arguments.
- **Real-Time Feedback**: Referees give scores and comments for each round, enabling detailed analysis.
- **Text-to-Speech**: Listen to the arguments through integrated Text-to-Speech functionality.
- **Interactive User Interface**: Built with React for a smooth, engaging user experience.
- **Speech Controls**: Users can play, pause, resume, and stop the speech for real-time feedback.

## Technologies Used
- **Backend**: Node.js with Express
- **Frontend**: React.js
- **APIs**: OpenAI GPT-4, Google Generative AI (Gemini), LLaMA, Gemma, Mixtral, GroqLlama
- **Hosting**: AWS (EC2 backend, S3 frontend)
- **Text-to-Speech**: Web Speech API

## Testing videos link
https://youtu.be/xKlCkzx8LGQ
## Installation

### Prerequisites
- Node.js (v14+)
- React (v17+)
- API Keys for:
  - OpenAI
  - Google Generative AI (Gemini)
  - Groq (LLaMA, Gemma, Mixtral, GroqLlama)

### Steps
1. Clone the repository:
   

2.Install dependencies:
npm install

Create a .env file in the root directory and add your API keys:

bash
Copy code
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key
GROQ_API_KEY=your-groq-key
GEMMA2_API_KEY=your-gemma-key
MIXTRAL_API_KEY=your-mixtral-key
LLAMA3_API_KEY=your-llama-key

4-Start the backend server
cd debate-app-backend
npm start
5-Start the frontend
cd  debate-app-frontend
npm start


## Usage

1. Navigate to the main page in your browser.
2. Select two AI debaters and their respective roles.
3. Select four AI referees.
4. Enter a debate topic.
5. Click "Start Debate" to begin a multi-round debate.
6. View the arguments and referee scores after each round.
7. Use the Text-to-Speech feature to listen to arguments.

## Future Enhancements
1.Add more AI models and integrations.
2.Store debate history in a database for analysis.
3.Improve referee scoring algorithms.
4.Enable real-time multi-user debates.
