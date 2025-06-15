# CaronaFC Server

Welcome to the **CaronaFC Server** project! This is a backend server built with [NestJS](https://nestjs.com/) for managing carpooling (carona) functionalities for football clubs and communities.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Running with Docker](#running-with-docker)
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
│   ├── modules/
│   │   ├── avaliacao/
│   │   ├── jogo/
│   │   ├── tipo-veiculo/
│   │   ├── usuario/
│   │   ├── veiculo/
│   │   └── viagem/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── avaliacao/
│   ├── jogo/
│   ├── tipo-veiculo/
│   ├── usuario/
│   ├── veiculo/
│   ├── viagem/
│   ├── app.controller.spec.ts
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── README.md
└── ... (other config files)
```

- **src/**: Main source code for the server.
- **modules/**: Feature modules (usuário, veículo, avaliação, etc).
- **test/**: Unit and end-to-end tests.
- **.env**: Environment variables.
- **docker-compose.yml**: Docker Compose configuration for app and database.
- **Dockerfile**: Docker build instructions.
- **package.json**: Project dependencies and scripts.

---

## Bibliotecas Utilizadas

- **@nestjs/core, @nestjs/common, @nestjs/typeorm** — Framework principal e integração com TypeORM.
- **typeorm** — ORM para Node.js, utilizado para abstração e manipulação do banco de dados.
- **pg** — Driver oficial do PostgreSQL para Node.js.
- **@nestjs/swagger** — Integração do Swagger para documentação automática da API REST.
- **@nestjs/config** — Gerenciamento de variáveis de ambiente e configuração.
- **class-validator, class-transformer** — Validação e transformação de DTOs.
- **dotenv** — Carregamento de variáveis de ambiente a partir do arquivo `.env`.
- **Jest** — Testes unitários e e2e.
- **Docker, Docker Compose** — Containerização da aplicação e do banco de dados.

> Consulte o arquivo `package.json` para a lista

## Relacionamento do Banco de Dados

### Usuário (`Usuario`)
- **Um usuário pode cadastrar vários veículos**  
  - Relacionamento: **OneToMany**  
  - Exemplo:  
    - Um usuário possui uma lista de veículos (`veiculos: Veiculo[]`)
    - Cada veículo pertence a um único usuário (`usuario: Usuario`)

### Veículo (`Veiculo`)
- **Cada veículo pertence a um único usuário**
  - Relacionamento: **ManyToOne**
  - Exemplo:
    - Campo na entidade `Veiculo`: `@ManyToOne(() => Usuario) usuario: Usuario;`

### Viagem (`Viagem`)
- **Cada viagem tem um motorista**
  - Relacionamento: **ManyToOne**
  - Exemplo:
    - Campo na entidade `Viagem`: `@ManyToOne(() => Usuario) motorista: Usuario;`
- **Cada viagem pode ter vários passageiros**
  - Relacionamento: **ManyToMany**
  - Exemplo:
    - Campo na entidade `Viagem`: `@ManyToMany(() => Usuario) @JoinTable() passageiros: Usuario[];`

### Resumo dos Relacionamentos

- **Usuário 1:N Veículo**
- **Viagem N:1 Motorista (Usuário)**
- **Viagem N:M Passageiros (Usuário)**

---

### Exemplo Visual

```
Usuario
  ├──< Veiculo (1:N)
  ├──< Viagem (como motorista, N:1)
  └──< Viagem (como passageiro, N:M)

Viagem
  ├── motorista: Usuario (N:1)
  └── passageiros: Usuario[] (N:M)
```

---

Esses relacionamentos garantem que:
- Um usuário pode cadastrar vários veículos.
- Uma viagem sempre tem um motorista (usuário).
- Uma viagem pode ter vários passageiros (usuários).

Consulte os arquivos de entidade no diretório `src/modules/` para ver a implementação detalhada.

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
   Exemplo de `.env`:
   ```
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=root
   DATABASE_PASSWORD=caronafc
   DATABASE_NAME=caronafc
   ```

4. **Run the development server:**

   ```bash
   npm run start:dev
   ```

---

## Running with Docker

O projeto já está pronto para rodar com Docker e Docker Compose.

1. **Certifique-se de ter o Docker e Docker Compose instalados.**

2. **Configure seu arquivo `.env`** (veja exemplo acima).

3. **Suba os containers:**

   ```bash
   docker-compose up --build
   ```

   Isso irá:
   - Subir um container do PostgreSQL na porta 5433 do host.
   - Subir o backend NestJS na porta 3000 do host.
   - Usar as variáveis do seu `.env` para conectar o app ao banco.

4. **Acesse a API em:**  
   [http://localhost:3000](http://localhost:3000)

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

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE)