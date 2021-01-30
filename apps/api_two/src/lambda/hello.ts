import { APIGatewayEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

export const handler: Handler<APIGatewayEvent, APIGatewayProxyResult> = (event, context, callback) => {
    console.log('context: ', context);
    console.log('queryStringParameters', event.queryStringParameters)

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ msg: 'Hello, World!' }),
    })
}