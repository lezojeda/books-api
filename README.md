## Requirements
* Docker
* Node v16.x

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

2. Run migrations with:

```bash
$ npm run prisma:dev:deploy
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```