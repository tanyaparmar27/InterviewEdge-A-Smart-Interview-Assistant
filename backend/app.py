from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA
from flask import Flask, request, jsonify
from pyngrok import ngrok
import torch
import os
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})

hf_token = os.getenv('HF_TOKEN')

quantization_config = BitsAndBytesConfig(
    load_in_8bit=True,  
    bnb_8bit_compute_dtype=torch.float16  
)

tokenizer = AutoTokenizer.from_pretrained("/teamspace/studios/this_studio/local_llama_3_3b", use_auth_token=hf_token)
model = AutoModelForCausalLM.from_pretrained(
    "/teamspace/studios/this_studio/local_llama_3_3b",
    quantization_config=quantization_config,
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True,
    use_auth_token=hf_token
)

hf_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512
)

llm = HuggingFacePipeline(pipeline=hf_pipeline)

vectorstores = {
    "java": Chroma(persist_directory="/teamspace/studios/this_studio/java_vectorstore_3b_dyn", embedding_function=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")),
    "cpp": Chroma(persist_directory="/teamspace/studios/this_studio/cpp_vectorstore_3b_dyn", embedding_function=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")),
    "c": Chroma(persist_directory="/teamspace/studios/this_studio/c_vectorstore_3b_dyn", embedding_function=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2"))
}

def retrieve_reference_answer(question, language):
    vectorstore = vectorstores[language]
    retriever = vectorstore.as_retriever()
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff"
    )
    answer = qa_chain.run(question)
    return answer

def evaluate_answer(user_answer="", reference_answer="", question="", language="", job_title="fresher", years_of_experience="0"):
    sys_pmt = (
        f"You are an expert {language} programmer and evaluator, tasked with grading a {language} interview answer based on four criteria: Technical Accuracy, Completeness, "
        f"{language}-specific Knowledge, and Clarity."
        "\n\nContext: The interviewee is a {job_title} candidate with {years_of_experience} years of experience in programming."
        "\n\nEvaluate the following question: {question}, reference answer: {reference_answer}, and user's answer: {user_answer}."
        "\n\nStrict Scoring Instructions:"
        "\n1. Technical Accuracy (0-10): Penalize heavily for incomplete or incorrect explanations."
        "\n   - If the answer omits any important part of the question, reduce the score significantly."
        "\n   - Deduct points for incorrect or incomplete explanations of concepts."
        "\n2. Completeness (0-10): A comprehensive answer must address all parts of the question."
        "\n   - Missing any part of the question should result in a low score."
        "\n   - The answer should cover subtopics in sufficient detail, appropriate to the interviewee's experience level and job title."
        "\n3. {language}-Specific Knowledge (0-10): The answer must demonstrate an understanding of {language} terminology and concepts."
        "\n   - A deeper understanding of {language}-specific features should be reflected in the score."
        "\n   - Penalize answers that fail to demonstrate knowledge of key terms."
        "\n4. Clarity and Structure (0-10): A well-organized, clear answer should receive points, but missing parts should significantly affect the overall score."
        "\n   - Penalize for lack of organization, especially if the response omits entire or some parts of the question."
        "\n\nFor each criterion, provide a score from 0 to 10 and a one line justification in parentheses."
        "\n\nFinally, calculate the average score. For output, only provide the criteria score with justification in parentheses, and average score, and nothing else."
    )

    messages = [
        {"role": "system", "content": sys_pmt},
        {"role": "user", "content": f"Question: {question}\n\nReference Answer:\n\n{reference_answer}\n\nUser's Answer:\n\n{user_answer}"}
    ]

    outputs = hf_pipeline(
        messages,
        max_new_tokens=512,
        do_sample=True,
        temperature=0.9,
        top_p=0.9,
    )

    return outputs[0]["generated_text"][2]["content"]


@app.route('/evaluate_java', methods=['POST'])
def evaluate_java():
    data = request.json
    return evaluate(data, "java")

@app.route('/evaluate_cpp', methods=['POST'])
def evaluate_cpp():
    data = request.json
    return evaluate(data, "cpp")

@app.route('/evaluate_c', methods=['POST'])
def evaluate_c():
    data = request.json
    return evaluate(data, "c")

def evaluate(data, language):
    if data is None or 'question' not in data or 'user_answer' not in data:
        return jsonify({"error": "question/answer missing!"}), 400

    question = data.get('question')
    user_answer = data.get('user_answer')
    job_title = data.get('job_title', "fresher")
    years_of_experience = data.get('years_of_experience', "0")
    reference_answer = retrieve_reference_answer(question, language)
    evaluation = evaluate_answer(user_answer, reference_answer, question, language, job_title, years_of_experience)

    return jsonify({"evaluation": evaluation})

ngrok.set_auth_token(os.getenv('NGROK_AUTH_TOKEN'))
public_url = ngrok.connect(5030)
print("public url:", public_url)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5030)
