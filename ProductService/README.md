# Shop-Tai-Che
Product Service

## Introduction

This is an product service with which can manage Products

## File structure

```
.
├── models
├── routes
│   └── productRoute.js
├── contollers
|   ├── productController.js
│   └── errorController.js
├── configs
|   ├── corsOptions.js
│   └── allowedOrigins.js
├── middlewares
│   └── corsMiddleware.js
├── assets
├── utils
|   ├── appError.js
│   └── catchAsync.js
├── prisma
|   ├── migrations.js
|   ├── prisma.js
│   └── schema.prisma
├── app.js
├── package.json
├── server.py
├── README.md
└── ...
```

## Table of Contents

- [Tech Stack](#techstack)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-)
- [Development](#development)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Tech Stack

- NodeJS
- Express
- JWT (Authentication)
- PostgreSQL (Database)
- MongoDB (Database)
- Prisma

## Features

Product

- API Get, Search products
- API get suggestion

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_POSTGRE`

`DATABASE_MONGODB`

## Run Locally

Clone the project

```bash
  git clone git@github.com:Shop-Tai-Che/STC-Backend.git
```

Go to the project directory

```bash
  cd ProductService
```

Install dependencies

```bash
 npm install
```

Migrate prisma

```bash
 prisma generate
```

Start the server

```bash
  npm start
```

## Development

To run program in product environment:

- docker and docker-compose
- git

1. Clone the reposity:

```bash
    git clone git@github.com:Shop-Tai-Che/STC-Backend.git
```

2. From within the repository directory, run:

```bash
    docker-compose up --build -d
```

## Acknowledgements

- [Express](https://expressjs.com/)
- [JWT Authentication](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [Docker](https://www.docker.com/)


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, email tranduykhuongit@gmail.com for supports.
