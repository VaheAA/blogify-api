# API - Blogify

## Overview
This is the backend API for the Blogify application, built with [NestJS](https://nestjs.com/). It leverages Docker, PostgreSQL, and Mikro ORM to provide a robust and scalable backend. The application supports both development and production environments.

Production deployment is handled via AWS EC2 with an HTTPS connection secured by a Let's Encrypt certificate, accessible at: `https://api.blogify.ink`.

## Features
- **Authentication**: Implements JWT-based authentication.
- **CRUD for Posts**: Supports Create, Read, Update, and Delete operations for blog posts.
- **Entity Relationships**:
    - A `User` can have multiple `Posts`.
    - A `Post` can have multiple `Tags`.
    - Supports relational operations between `User`, `Post`, and `Tag` entities.

## Tech Stack
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL with [Mikro ORM](https://mikro-orm.io/)
- **Containerization**: Docker and Docker Compose
- **Deployment**: AWS EC2 with HTTPS via Let's Encrypt

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/blogify-api.git
   cd blogify-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
   Configure the `.env` file with your specific values.

## Running the Application

### Development
To start the application in development mode:
```bash
npm run start:dev
```
Or using Docker:
```bash
npm run start:docker:dev
```

### Production
To build and start the application in production mode:
```bash
npm run build
npm run start:prod
```
Or using Docker:
```bash
npm run start:docker:prod
```

## Makefile Commands
For easier management, a `Makefile` is included. Use the following commands:

- **Start Development:**
  ```bash
  make dev
  ```
- **Start Production:**
  ```bash
  make prod
  ```
- **Stop Containers:**
  ```bash
  make clean-all
  ```
## Scripts
Key scripts from `package.json`:

- `start` - Starts the application.
- `start:dev` - Starts the application in development mode.
- `start:prod` - Starts the application in production mode.
- `start:docker:dev` - Starts the application in Docker for development.
- `start:docker:prod` - Starts the application in Docker for production.
- `build` - Builds the application.
- `lint` - Runs ESLint and fixes issues.
- `format` - Formats code with Prettier.
