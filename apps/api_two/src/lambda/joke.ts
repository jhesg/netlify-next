// FIXME: remove 'encoding` package, this should be included as a node-fetch dependency instead
// https://community.netlify.com/t/error-could-not-find-encoding-module-in-file-netlify-function/2259/7
import fetch from "node-fetch"

import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda'

const apiURL = "https://icanhazdadjoke.com"

const getJSONResponse = (response: APIGatewayProxyResult): APIGatewayProxyResult => ({
    ...response,
    headers: {
        ...response.headers,
        'Content-Type': 'application/json'
    }
})

export async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    const options = { headers: { Accept: "application/json" } }

    try {
        const data = await fetch(apiURL, options).then(res => res.json())

        return getJSONResponse({
            statusCode: 200,
            body: JSON.stringify({ msg: data.joke })
        })
    } catch (err) {
        console.log(err)

        return getJSONResponse({
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        })
    }
}