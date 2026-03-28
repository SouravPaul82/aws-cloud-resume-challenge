# backend/test_lambda.py
import json
import unittest
from unittest.mock import patch, MagicMock


class TestLambdaHandler(unittest.TestCase):

    @patch('lambda_function.table')
    def test_returns_visitor_count(self, mock_table):
        """Happy path: DynamoDB returns a count successfully."""
        from backend.lambda_function_new import lambda_handler # pyright: ignore[reportMissingImports]

        mock_table.update_item.return_value = {
            'Attributes': {'visitor_count': 42}
        }

        response = lambda_handler({}, {})

        self.assertEqual(response['statusCode'], 200)
        body = json.loads(response['body'])
        self.assertEqual(body['visitor_count'], 42)

    @patch('lambda_function.table')
    def test_handles_dynamodb_error(self, mock_table):
        """DynamoDB failure should return 500, not crash."""
        from backend.lambda_function_new import lambda_handler # pyright: ignore[reportMissingImports]
        from botocore.exceptions import ClientError # pyright: ignore[reportMissingImports]

        mock_table.update_item.side_effect = ClientError(
            {'Error': {'Code': '500', 'Message': 'Internal error'}},
            'UpdateItem'
        )

        response = lambda_handler({}, {})    
        self.assertEqual(response['statusCode'], 500)

if __name__ == '__main__':
    unittest.main()