import Fastify, { FastifyError } from "fastify";
import genericErrorSchema from "./schemas/genericError.schema";
import openapiSchema from "./schemas/openapi.schema";
import basicAuth from "./middleware/basicAuth";

// routes
import v1Routes from './routes/v1';

export default async function (port: number) {
  const fastify = Fastify({
    logger: true,
  });

  fastify.setErrorHandler(function (error: FastifyError, request, reply) {
    fastify.log.error(error);
    reply.status(error.statusCode || 500).send({
      error: error.message,
    });
  });

  //console.log(fastify.basicAuth)
  fastify.addHook("preHandler", basicAuth);
  fastify.register(import("@fastify/swagger"), openapiSchema);
  fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  });

  fastify.addSchema(genericErrorSchema);

  fastify.register(v1Routes, { prefix: "/api/v1" });

  try {
    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
