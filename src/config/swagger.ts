export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mamba Campaign REST API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Testing environment',
      },
    ],
  },
  apis: ['docs/**/*.yml'],
};
