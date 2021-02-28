## CoupangEats

- #01 First init

  > NestJS, GraphQL, TypeORM(postgres)

  ```bash
  npm i @nestjs/graphql graphql-tools graphql apollo-server-express

  npm install --save @nestjs/typeorm typeorm pg
  ```

- #02 NestConfig

  ```bash
  npm i --save @nestjs/config

  npm install --save-dev cross-env

  npm install --save joi
  ```

- #03 Restaurant Entity, DTO, Create Resolver

- #04 User Entity, DTO, Create Resolver, Relations User with Restaurant

- #05 Hashed Password

  ```bash
  npm install bcrypt
  ```

- #06 Jwt (Generated token)

  > Our Custom Module for Generated Token

- #07 JwtMiddleware

- #08 CurrentUser Decorator, Guard Based Role

- #09 Category Entity, Create Restaurant Mutation

- #10 Get Restaurants By Category

- #11 Get Restaurant By Id

- #12 Logged Check Guard