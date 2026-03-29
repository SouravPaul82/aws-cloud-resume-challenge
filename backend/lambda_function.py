import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-counter')

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }

    # ✅ HTTP API sends method here, not in httpMethod
    # Check both locations to support REST API and HTTP API
    http_method = (
        event.get('requestContext', {})
             .get('http', {})
             .get('method', '')
        or event.get('httpMethod', 'POST')
    ).upper()

    print(f"Received method: {http_method}")  # shows in CloudWatch logs
    print(f"Full event: {json.dumps(event)}") # shows full event for debugging

    if http_method == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    try:
        if http_method == 'POST':
            # New visitor — increment
            response = table.update_item(
                Key={'id': 'visitors'},
                UpdateExpression='SET visitor_count = if_not_exists(visitor_count, :zero) + :inc',
                ExpressionAttributeValues={':inc': 1, ':zero': 0},
                ReturnValues='UPDATED_NEW'
            )
            count = int(response['Attributes']['visitor_count'])

        else:
            # GET — just read, no increment
            response = table.get_item(Key={'id': 'visitors'})
            count = int(response.get('Item', {}).get('visitor_count', 0))

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'visitor_count': count})
        }

    except ClientError as e:
        print(f"DynamoDB error: {e.response['Error']['Message']}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Could not process request'})
        }
