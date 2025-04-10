import boto3
import json
import os

def handler(event, context):
    s3_bucket = os.environ['STORAGE_OCRIMAGES_BUCKETNAME']
    body = json.loads(event['body'])
    s3_key = body['key']

    textract = boto3.client('textract')
    response = textract.detect_document_text(
        Document={'S3Object': {'Bucket': s3_bucket, 'Name': s3_key}}
    )

    extracted_text = []
    for item in response['Blocks']:
        if item['BlockType'] == 'LINE':
            extracted_text.append(item['Text'])

    return {
        'statusCode': 200,
        'body': json.dumps({'text': '\n'.join(extracted_text)})
    }
