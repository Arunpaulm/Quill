## Quill: An Online Bookstore

**Quill** is an online bookstore application built with Node.js, Express.js, TypeScript, React, and Google Cloud Platform. 

### Technologies

* **Backend:**
    * Node.js
    * TypeScript
    * Express.js (web framework)
    * GraphQL (API)
    * Mongoose (ODM for MongoDB)
    * Multer (file upload handling)
    * Passport.js (authentication)
    * Jest (unit testing framework)
* **Frontend:**
    * React.js
    * TypeScript
    * Tailwind CSS
    * Axios
* **Cloud Platform:**
    * Docker (Container image)
    * Google Cloud Run (serverless execution)
    * Google Cloud Storage (file storage)

### Project Structure

```
quill/
├── backend/
│   ├── src/
│   │   ├── graphql/  # GraphQL API definitions and resolvers
│   │   ├── controllers/  # Business logic handlers
│   │   ├── models/  # Mongoose data models
│   │   ├── config/  # Database config
│   │   ├── routers/  # express router
│   │   ├── jest.config.js  # Jest configuration
│   │   └── index.ts  # Application entry point/server
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/  # Application pages
│   │   └── services/  # Data fetching and logic
│   ├── public/  # Static assets (images, fonts, etc.)
│   ├── package.json
│   └── tsconfig.json
├── .env  # Environment variables
└── README.md  # This file
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ArunpaulM/quill.git
```

2. Install dependencies:

   * Navigate to the project root directory.
   * Run `npm install` to install backend dependencies.
   * Run `cd frontend && npm install` to install frontend dependencies.

### Configuration

* Create a `.env` file in the root directory and add your environment variables:
    * `MONGODB_URI`: URI for your MongoDB database.
    * `GOOGLE_CLOUD_PROJECT`: Your Google Cloud project ID.
    * (Optional) `JWT_SECRET`: Secret key for JWT authentication (if using).

### Running the application

1. Start the backend server:
   
   * Navigate to the `backend` root directory.
   * Run `npm run start` in the project root directory.

2. Start the frontend development server:

   * Navigate to the `frontend` directory.
   * Run `npm run start` to start the development server.

The application will be accessible at http://localhost:3090 in your browser.

### Deployment

This project is configured to deploy to Google Cloud Run. You will need to configure your Google Cloud project and set up appropriate IAM permissions.

**Note:** Refer to the Google Cloud documentation for detailed deployment instructions: [https://cloud.google.com/run/docs/deploying](https://cloud.google.com/run/docs/deploying)

### Testing

Jest is used for unit testing. Run the tests with:

```bash
npm test
```

### Contributing

We welcome contributions to this project! Please see the CONTRIBUTING.md file for guidelines on how to contribute.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
