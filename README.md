## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
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

### Monitoring with Prometheus

http://localhost:9090/graph?g0.expr=http_requests_total
### Observability with Opentelemetry and jaeger

http://localhost:16686/search

http://localhost:16686/search?service=base-server&tags=%7B%22http.route%22%3A%22%2F%2A%22%7D


### Documentation

https://docs.nestjs.com/openapi/types-and-parameters
