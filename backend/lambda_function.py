import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-counter')  # ✅ matches your actual table name

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    try:
        http_method = event.get('httpMethod', 'POST')

        if http_method == 'POST':
            response = table.update_item(
                Key={'id': 'visitors'},
                UpdateExpression='SET visitor_count = if_not_exists(visitor_count, :zero) + :inc',
                ExpressionAttributeValues={':inc': 1, ':zero': 0},
                ReturnValues='UPDATED_NEW'
            )
            count = int(response['Attributes']['visitor_count'])
        else:
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