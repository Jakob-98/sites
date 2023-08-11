from flask import Blueprint, request, jsonify
from search_project.context import Context
from search_project.persistence import ContextDB, SL3ContextDB
from search_project.llm import OpenaiGpt
from search_project.personas import Jakob
from search_project.orchestrator import Orchestrator

chat_blueprint = Blueprint('chat', __name__)

@chat_blueprint.route('/chat', methods=['POST'])
def chat():
    # Get user message from request body
    data = request.get_json()
    msg = data.get('message', '')
    
    new_context = Context(Jakob)
    llm = openaigpt.OpenaiGpt()
    chat_orchestrator = orchestrator.Orchestrator(llm, new_context)
    
    response = chat_orchestrator.user_message(msg)
    
    return jsonify({'response': response})
