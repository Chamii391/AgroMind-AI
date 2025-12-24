# chat.py
import os

from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_classic.memory import ConversationBufferMemory
from langchain_classic.chains import ConversationChain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

load_dotenv()


# 1) System rules: agriculture only
SYSTEM_PROMPT = """
You are an expert agriculture assistant.
ONLY answer agriculture/farming related questions.
If not agriculture, refuse politely.

IMPORTANT OUTPUT RULES:
- Keep answers short: max 5 bullet points OR max 120 words.
- No long explanations unless the user asks "explain more".
- Ask 1 short follow-up question only if needed.
"""


# 2) Prompt with memory slot
prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# 3) Groq model (you can change model name)
llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.1-8b-instant",
    temperature=1.0,
    max_tokens=180
)

# 4) Memory: keeps conversation history in this Python process
memory = ConversationBufferMemory(return_messages=True)

# 5) Conversation chain
chain = ConversationChain(
    llm=llm,
    prompt=prompt,
    memory=memory,
    verbose=False
)

def ask_agri_bot(user_text: str) -> str:
    """
    Send a user message to the agriculture-only bot and return the assistant reply.
    """
    result = chain.predict(input=user_text)
    return result
