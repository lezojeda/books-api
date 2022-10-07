## System requirements
* Docker ^20.x
* Node ^16.x

## Installation

Install dependencies:
```bash
$ npm install
```

### Database setup

1. With docker running, execute:

```bash
$ npm run db:dev:up
```

2. Make sure to have the .env variables set

3. Run migrations with:

```bash
$ npm run prisma:migrate:dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Postman Collection

Access the latest snapshot of the API's Postman collection using [this link](https://www.getpostman.com/collections/37f79a420b3d4b023c2d)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```