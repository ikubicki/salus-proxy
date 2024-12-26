import { FastifyError } from "fastify";

export default class APIError implements FastifyError {
  name: string;
  message: string;
  code: string;
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    this.message = message;
    this.name = message;
    this.code = `${statusCode}`;
    this.statusCode = statusCode;
  }
}
