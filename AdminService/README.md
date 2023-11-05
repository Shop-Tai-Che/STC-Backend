# Shop-Tai-Che
ADMIN Service

## Introduction

This is an administrative service with which administrators can manage the system's data

## File structure

```
.
├── auth
│   ├── internals
│   ├── middlewares
│   └── utils.py
├── admin
│   ├── models
│   ├── admin_backend.py
│   └── auth_backend.py
├── love
│   └── models
│       └── love_model.py
├── product
│   └── models
│       └── product_model.py
├── tag
│   └── models
│       └── tag_model.py
├── service
│   └── firebase_util.py
├── main.py
├── firebaseConfig.py
├── config.py
├── database.py
├── README.md
├── requirements.txt
└── ...
```

## Table of Contents

- [Tech Stack](#techstack)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-)
- [Development](#development)
- [Running tests](#running-tests)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Tech Stack

- FastAPI
- Firebase (Storage service)
- Sentry (Error handling)
- JWT (Authentication)
- PostgreSQL (Database)

## Features

Admin dashboard

- Product management
- Tag management
- Media management
- Love management
- Order management

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRES_USER`

`POSTGRES_HOST`

`POSTGRES_PASSWORD`

`POSTGRES_DATABASE`

`JWT_SECRET_KEY`

`JWT_REFRESH_SECRET_KEY`

`JWT_ALGORITHM`

`MJ_APIKEY_PUBLIC`

`MJ_APIKEY_PRIVATE`

## Run Locally

Clone the project

```bash
  git clone git@github.com:Shop-Tai-Che/STC-Backend.git
```

Go to the project directory

```bash
  cd AdminService
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  uvicorn main:app --reload
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

- [FastAPI](https://fastapi.tiangolo.com/)
- [JWT Authentication](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [Docker](https://www.docker.com/)

## Running Tests

To run tests, run the following command

```bash
  pytest
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, email tranduykhuongit@gmail.com for supports.
