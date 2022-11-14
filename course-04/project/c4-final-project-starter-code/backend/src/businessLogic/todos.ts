// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
//import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { getUserId } from '../lambda/utils'
import { TodoItem } from '../models/TodoItem'
//import { getTodoById } from '../dataLayer/todosAccess'
// import * as createError from 'http-errors'
//import {TodoItem} from "../models/TodoItem";
import {parseUserId} from "../auth/utils";
import { deleteTodoItem } from '../dataLayer/todosAccess'
//import {CreateTodoRequest} from "../requests/CreateTodoRequest";


//const uuidv4 = require('uuid/v4');
//const toDoAccess = new ToDoAccess();

// // TODO: Implement businessLogic
// export async function deleteTodo(todoId: string, userId: string): Promise<string> {
//   const item = await getTodoById(todoId)
//  console.log(item)
//  return deleteTodo(todoId, userId)
// ​
// }
export async function deleteTodo(
  todoId: string,
  jwtToken: string
) {
  const userId = parseUserId(jwtToken)
  return await deleteTodoItem(todoId, userId)
}

export function todoBuilder(todoRequest: CreateTodoRequest,event: APIGatewayProxyEvent): TodoItem{
    const todoId = uuid.v4()
    const todo = {
      todoId: todoId,
      userId: getUserId(event),
      createdAt: new Date().toISOString(),
      done: false,
      attachmentUrl: '',
      ...todoRequest
     }
        return todo as TodoItem
}
// export function deleteToDo(todoId: string, jwtToken: string): Promise<string> {
//   const userId = parseUserId(jwtToken);
//   return toDoAccess.deleteToDo(todoId, userId);