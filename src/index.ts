import "dotenv/config";
import startServer from "./server";

startServer(parseInt(process.env.PORT || "8080"));
