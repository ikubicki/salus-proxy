import { FastifyReply, FastifyRequest } from "fastify";
import APIError from "../utils/apiError";

export default function basicAuth(
  req: FastifyRequest,
  res: FastifyReply,
  next: CallableFunction,
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new APIError("Authentication failed", 401);
  }
  const [authType, authValue] = authHeader.split(" ");

  if (authType !== "Basic" || !authValue) {
    throw new APIError("Invalid authorization method", 401);
  }
  const decodedAuth = Buffer.from(authValue, "base64").toString("utf-8");
  const authUsers = process.env.AUTH_USERS || ":";

  if (!authUsers.includes(decodedAuth)) {
    throw new APIError("Invalid credentials", 401);
  }
  next();
}
