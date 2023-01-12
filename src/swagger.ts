/* eslint-disable @typescript-eslint/no-var-requires */
const swaggerAutogen = require('swagger-autogen')()
const dotenv = require('dotenv')
dotenv.config()
const os = require('os')
const doc = {
  basePath: '/api/',
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'Package Tracker API Design ', // by default: 'REST API'
    description: 'NOTE: For some reason, the Swagger UI is causing some CORS errors when sending the request through the UI. However, you can see the endpoints and test them with Postman or any other API platform. This is an API that follows good practices such a Authorization, Rate limitting and Rate slowdown. You can create an order with your username and search the availables order, however, you can\'t see other users orders.'
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT'
    }
  },
  security: [{ bearerAuth: [] }
  ],
  host: 'api-design-tracker.onrender.com'
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router.ts', './server.ts']

swaggerAutogen(outputFile, endpointsFiles, doc)
