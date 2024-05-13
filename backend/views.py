from flask import Blueprint, request, jsonify
from azure.cosmos import exceptions, CosmosClient, PartitionKey
import os
import hashlib
import logging

logger = logging.getLogger("__name__")

# Initialize Cosmos client
try:
    cosmos_url = os.environ['COSMOS_DB_URL']
    key = os.environ['COSMOS_DB_KEY']
    client = CosmosClient(cosmos_url, credential=key)

    # Create or get database and container
    database_name = 'ViewsDb'
    container_name = 'ViewsContainer'
    database = client.create_database_if_not_exists(id=database_name)
    container = database.create_container_if_not_exists(
        id=container_name,
        partition_key=PartitionKey(path="/id"),
        offer_throughput=400
    )
except Exception as e:
    logger.info(f"failed to load cosmos, {e}")

views_blueprint = Blueprint('views', __name__)

@views_blueprint.route('/add_view', methods=['POST'])
def add_views():
    data = request.get_json()
    url = data.get('url', '')
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    url_id = hashlib.md5(url.encode('utf-8')).hexdigest()
    
    # Upsert the document
    try:
        item = container.read_item(item=url_id, partition_key=url_id)
        item['views'] += 1
    except exceptions.CosmosResourceNotFoundError:
        item = {'id': url_id, 'url': url, 'views': 1}
    
    container.upsert_item(item)
    
    return jsonify({'url': url, 'views': item['views']}), 200

@views_blueprint.route('/get_views', methods=['GET'])
def get_views():
    url = request.args.get('url', '')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    url_id = hashlib.md5(url.encode('utf-8')).hexdigest()
    try:
        item = container.read_item(item=url_id, partition_key=url_id)
        return jsonify({'url': item['url'], 'views': item['views']}), 200
    except exceptions.CosmosResourceNotFoundError:
        return jsonify({'error': 'URL not found'}), 404
