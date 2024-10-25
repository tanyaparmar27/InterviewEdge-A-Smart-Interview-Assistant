from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import os
from dotenv import load_dotenv

load_dotenv()

model_id = "meta-llama/Llama-3.2-3B-Instruct"
hf_token = os.getenv('HF_TOKEN')

tokenizer = AutoTokenizer.from_pretrained(model_id, use_auth_token=hf_token)

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token  

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True,
    use_auth_token=hf_token
)

model_save_path = "./local_llama_3_3b"  
model.save_pretrained(model_save_path)
tokenizer.save_pretrained(model_save_path)

print(f"Model and tokenizer saved to {model_save_path}")
