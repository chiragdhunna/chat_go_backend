// filepath: c:\Users\chira\Desktop\Docs\Github Projects\chat_go_backend\utils\swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
const __dirname = path.resolve();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat GO Backend API",
      version: "1.0.0",
      description: "API documentation for Chat GO Backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [
    "./routes/*.js",
    "./controllers/*.js",
    path.join(__dirname, "utils/swaggerModels.js"),
  ], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
