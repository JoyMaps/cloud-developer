// import 'source-map-support/register'

// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'

// //import { deleteTodo } from '../../businessLogic/todos'
// //import { getUserId } from '../utils'

// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     const todoId = event.pathParameters.todoId
//     console.log(todoId)
//     // TODO: Remove a TODO item by id
    
//     return undefined
    
//   }
// )

// handler
//   .use(httpErrorHandler())
//   .use(
//     cors({
//       credentials: true
//     })
//   )
// import 'source-map-support/register'
// import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
// import { deleteTodo } from "../../businessLogic/todos";
// ​
// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     // TODO: Remove a TODO item by id
//     //console.log("Processing Event ", event);
//     const authorization = event.headers.Authorization;
//     const split = authorization.split(' ');
//     const jwtToken = split[1];
// ​
//     const todoId = event.pathParameters.todoId;
// ​
//     const deleteData = await deleteTodo(todoId, jwtToken);
// ​
//     return {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true
//         },
//         body: deleteData,
//     }
// };
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { deleteTodo } from "../../businessLogic/todos";
import { createLogger } from '../../utils/logger'
// import { deleteTodo } from '../../businessLogic/todos'
// import { getUserId } from '../utils'
const logger = createLogger('auth')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // const userId = getUserId(event)
    // TODO: Remove a TODO item by id
    const authorization = event.headers.Authorization
      const split = authorization.split(' ')
      const jwtToken = split[1]
    await deleteTodo(todoId, jwtToken)
    logger.info('Todo deleted ', {
      key: todoId
      })
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({})
    }
  }
)
handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )