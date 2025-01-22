# InterviewEdge: A Smart Interview Assistant
An AI-powered system designed to automate and enhance non-coding technical interview assessments with unbiased evaluation and personalized feedback!

## Overview
InterviewEdge is a web application that facilitates programming interviews. It supports text and voice input, evaluates real-time responses, and generates downloadable interview summaries. The system leverages advanced AI technologies like Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs) for objective and consistent evaluation.
This work has been accepted at the 2025 IEEE International Students' Conference on Electrical, Electronics, and Computer Science (SCEECS 2025).


## Features
- Multi-Modal Input: Accepts responses via text or voice recordings
- Real-Time Evaluation: Instantly evaluates responses based on language-specific criteria
- Interview Summaries: Summarizes interview sessions into a downloadable PDF
- Multi-Modal Input: Accepts both text and voice responses for convenience
- Multi-Language Support: Supports Java, C++, and C with tailored evaluation metrics
-Evaluation Criteria:
  -Technical Accuracy
  -Completeness
  -Domain-specific knowledge
  -Clarity & Structure


## System Architecture
- Frontend: React.js
- Backend: Flask
- Deployment: Local server tunneling via Ngrok (optional)
- Model Integration:
  - Utilizes Llama-3.2-3B-Instruct from Hugging Face
  - Compatible with GPUs (16-24 GB VRAM)

  
## Getting Started
### Prerequisites
- Frontend: Node.js (v14 or above)
- Backend: Python (v3.8 or above), Ngrok (optional), Lightning AI (optional for GPU support)

### Installation Steps
1. Install frontend dependencies
   - Navigate to the frontend directory and install dependencies:
     ```
     cd frontend
     npm install
     ```
   - For ReactMic dependency issue, run:
     `npm install --legacy-peer-deps`
     
2. Install backend dependencies
   ```
   cd ../backend
   pip install -r requirements.txt
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory with the following values:
     ```
     HF_TOKEN=<your_hugging_face_token>
     NGROK_AUTH_TOKEN=<your_ngrok_auth_token>
     ```
4. Download the Llama model
   `python Saving_Llama3_3B.py`

5. Run the application
   - Run the backend
     `python app.py`
   - Run the frontend
     ```
     cd ../frontend
     npm start
     ```
   - Access the application at http://localhost:3000


#### Thank you for using InterviewEdge! Feel free to reach out with questions or suggestions.
