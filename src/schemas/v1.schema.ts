const device = {
  type: "object",
  properties: {
    id: { type: "string" },
    model: { type: "string" },
    name: { type: "string" },
    isRunning: { type: "boolean" },
    temperature: { type: "number" },
    currentTemperature: { type: "number" },
    mode: { type: "number" },
    humidity: { type: "number" },
    battery: { type: "number" },
    online: { type: "boolean" },
  },
};

const getDevices = {
  $id: "@v1.getDevices",
  tags: ["v1"],
  response: {
    200: {
      type: "array",
      items: device,
    },
  },
};

const getDevice = {
  $id: "@v1.getDevice",
  tags: ["v1"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
  },
  response: {
    200: device,
    404: {
      type: "object",
      $ref: "genericError",
    },
  },
};

const setTemperature = {
  $id: "@v1.setTemperature",
  tags: ["v1"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
  },
  body: {
    type: "object",
    properties: {
      temperature: {
        type: "number",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        result: {
          type: "boolean",
        },
      },
    },
    404: {
      type: "object",
      $ref: "genericError",
    },
  },
};

const setMode = {
  $id: "@v1.setMode",
  tags: ["v1"],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
  },
  body: {
    type: "object",
    properties: {
      mode: {
        type: "number",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        result: {
          type: "boolean",
        },
      },
    },
    404: {
      type: "object",
      $ref: "genericError",
    },
  },
};

export default {
  getDevices,
  getDevice,
  setMode,
  setTemperature,
};
