# Shop-Tai-Che
Feedback Service

## Introduction

This is an feedback service with which can manage review, rating, love features

## File structure

```
.
├── models
├── routes
├── contollers
│   └── errorController.js
├── assets
├── utils
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

Feedback

- API Love
- API review

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
  cd FeedbackService
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
