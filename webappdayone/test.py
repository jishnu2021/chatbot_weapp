from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize AI model
model = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.2, max_output_tokens=200)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "Empty message"}), 400

    chat_history = [
        SystemMessage(content="You are a helpful assistant."),
        HumanMessage(content=user_input)
    ]

    response = model.invoke(chat_history)
    ai_response_content = response.content[:300]  # Limit response length

    return jsonify({"reply": ai_response_content})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
