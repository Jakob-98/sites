import os
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from chat import chat_blueprint
from like import like_blueprint
from views import views_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(chat_blueprint)
app.register_blueprint(like_blueprint)
app.register_blueprint(views_blueprint)

@app.route('/githubdata', methods=['GET'])
def get_github_data():
    query = """
    query {
        viewer {
            pinnedItems(first: 6, types: [REPOSITORY]) {
                nodes {
                ... on Repository {
                    id
                    name
                    url
                    description
                    stargazerCount
                    forkCount
                    primaryLanguage {
                        name
                    }
                }
                }
            }
        }
    }"""

    url = 'https://api.github.com/graphql'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {os.environ.get("GITHUB_TOKEN")}',
    }

    response = requests.post(url, json={'query': query}, headers=headers)
    return jsonify(response.json())

@app.route('/health', methods=['GET'])
def healthcheck():
    return jsonify({'status': 'ok'})

if __name__ == "__main__":
    app.run(debug=True)
