# CaronaFC Server

Welcome to the **CaronaFC Server** project! This is a backend server built with [NestJS](https://nestjs.com/) for managing carpooling (carona) functionalities for football clubs and communities.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Resources](#resources)
- [Support](#support)
- [Stay in touch](#stay-in-touch)
- [License](#license)

---

## Project Structure

```
caronafc-server/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── carona/
│   │   └── ... (other feature modules)
│   ├── common/
│   └── ... (other shared code)
├── test/
│   └── ... (e2e and unit tests)
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── ... (other config files)
```

- **src/**: Main source code for the server.
- **modules/**: Feature modules (authentication, user, carona, etc).
- **config/**: Configuration files (database, environment, etc).
- **common/**: Shared utilities, decorators, filters, etc.
- **test/**: Unit and end-to-end tests.
- **.env**: Environment variables.
- **package.json**: Project dependencies and scripts.

---

## Features

- User authentication and registration
- Carpool (carona) creation and management
- User profile management
- RESTful API endpoints
- Modular and scalable architecture with NestJS
- Environment-based configuration
- Unit and e2e testing

---

## Getting Started

1. **Clone the repository:**

  ```bash
  git clone https://github.com/your-org/caronafc-server.git
  cd caronafc-server
  ```

2. **Install dependencies:**

  ```bash
  npm install
  ```

3. **Configure environment variables:**

  Copy `.env.example` to `.env` and update the values as needed.

4. **Run the development server:**

  ```bash
  npm run start:dev
  ```

---

## Scripts

- `npm run start`: Start the server in production mode.
- `npm run start:dev`: Start the server in development mode with hot reload.
- `npm run start:prod`: Build and run the server in production.
- `npm run test`: Run unit tests.
- `npm run test:e2e`: Run end-to-end tests.
- `npm run test:cov`: Run test coverage.

---

## Testing

- **Unit tests:**  
  `npm run test`

- **End-to-end tests:**  
  `npm run test:e2e`

- **Test coverage:**  
  `npm run test:cov`

---

## Deployment

See the [NestJS deployment documentation](https://docs.nestjs.com/deployment) for best practices.

To deploy using [Mau](https://mau.nestjs.com):

```bash
npm install -g @nestjs/mau
mau deploy
```

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Discord Community](https://discord.gg/G7Qnnhy)
- [NestJS Courses](https://courses.nestjs.com/)
- [NestJS Devtools](https://devtools.nestjs.com)
- [Enterprise Support](https://enterprise.nestjs.com)
- [Jobs Board](https://jobs.nestjs.com)

---

## Support

Nest is an MIT-licensed open source project. Support is welcome via [Open Collective](https://opencollective.com/nest#backer).

---

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

---

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).