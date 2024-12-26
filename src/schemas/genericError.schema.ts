const genericErrorSchema = {
  $id: "genericError",
  type: "object",
  properties: {
    error: {
      type: "string",
      description: "Error message",
    },
  },
};
export default genericErrorSchema;
