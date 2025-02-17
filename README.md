# Node.js Express API Boilerplate

A lightweight Node.js boilerplate with Express, Sequelize, and JWT authentication.

## Features

- Express.js REST API
- SQLite database with Sequelize ORM
- JWT Authentication
- User CRUD operations
- Environment variables configuration
- Database seeding
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository

git clone <repository-url>

cd node-starter

2. Install dependencies

npm install

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

4. Initialize the database and seed data

npm run sync
npm run seed

5. Start the development server

npm run start:dev

The server will start on `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Project Structure

```
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── database/      # Database setup and seeds
│   ├── middlewares/   # Custom middlewares
│   ├── models/        # Sequelize models
│   ├── routes/        # API routes
│   └── services/      # Business logic
├── app.js             # Application entry point
├── .env               # Environment variables
└── package.json       # Project dependencies
```

## Scripts

- `npm run start:dev` - Start development server with nodemon
- `npm run db:sync` - Sync database schema
- `npm run db:seed` - Seed database with initial data

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `JWT_SECRET` - Secret key for JWT tokens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
