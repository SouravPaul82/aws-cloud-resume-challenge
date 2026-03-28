import json
import boto3 # pyright: ignore[reportMissingImports]
from botocore.exceptions import ClientError # pyright: ignore[reportMissingImports]

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-count')

def lambda_handler(event, context):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
    try:
        response = table.update_item(
            Key={'id': 'visitors'},
            UpdateExpression='SET visitor_count = if_not_exists(visitor_count, :zero) + :inc',
            ExpressionAttributeValues={':inc': 1, ':zero': 0},
            ReturnValues='UPDATED_NEW'
        )
        count = int(response['Attributes']['visitor_count'])
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'visitor_count': count})
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Could not update visitor count'})
        }
