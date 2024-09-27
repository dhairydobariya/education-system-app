
require('dotenv').config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Education Management System API",
      version: "1.0.0",
      description: "API for managing education-related operations like student progress, teacher assignments, and more",
      contact: {
        name: "Developer",
        email: process.env.email
      },
      servers: [
        {
          url: process.env.url,
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./route/*.js"], // Add paths to your route files for Swagger to document
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
