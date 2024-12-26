import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import salus from "../../services/salus";
import v1Schema from "../../schemas/v1.schema";

type FastifyDeviceRequest = FastifyRequest<{
  Params: {
    id: string;
  };
  Body?: {
    mode?: number;
    temperature?: number;
  };
}>;

export default function (
  fastify: FastifyInstance,
  opts: FastifyServerOptions,
  done: CallableFunction,
) {
  fastify.get(
    "/devices",
    {
      schema: v1Schema.getDevices,
    },
    async (req: FastifyDeviceRequest, res: FastifyReply) => {
      return res.send(await salus.getDevices());
    },
  );
  fastify.get(
    "/devices/:id",
    {
      schema: v1Schema.getDevice,
    },
    async (req: FastifyDeviceRequest, res: FastifyReply) => {
      const deviceId = req.params.id;
      return res.send(await salus.getDevice(deviceId));
    },
  );
  fastify.post(
    "/devices/:id/temperature",
    {
      schema: v1Schema.setTemperature,
    },
    async (req: FastifyDeviceRequest, res: FastifyReply) => {
      const deviceId = req.params.id;
      const temperature = req.body?.temperature || 0;
      return res.send(await salus.setTemperature(deviceId, temperature));
    },
  );
  fastify.post(
    "/devices/:id/mode",
    {
      schema: v1Schema.setMode,
    },
    async (req: FastifyDeviceRequest, res: FastifyReply) => {
      const deviceId = req.params.id;
      const mode = req.body?.mode || 0;
      return res.send(await salus.setMode(deviceId, mode));
    },
  );
  done();
}
