// filepath: c:\Users\chira\Desktop\Docs\Github Projects\chat_go_backend\utils\swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
  apis: ["./routes/*.js", "./controllers/*.js"], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
