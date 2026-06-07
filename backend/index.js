import dotenv from "dotenv";
dotenv.config({path: ".env"});
console.clear();

import app from "./app.js";
import { initialize, gracefulShutdown, makeReceiptsDirectory } from "./helpers.js";

const server = app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
   console.log("Server started...."); 
});

initialize();
makeReceiptsDirectory();


process.on('SIGTERM', gracefulShutdown(server));
process.on('SIGINT', gracefulShutdown(server));