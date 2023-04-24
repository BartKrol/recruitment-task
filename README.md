# RecruitmentTask

This is a basic next.js / nest.js application in a nx monorepo with postgres database in docker-compose.

## Local development

1. `cp docker.env.example docker.env` and add env values. Run `docker-compose up`.

2. `yarn install`.

3. `cp ./apps/api/.env.example ./apps/api/.env` and add env values.

4. Run migrations: `yarn run migration:run`.

5. Seed the db: `nx seed api`.

6. Start api: `nx serve api`.

7. Start web: `nx serve web`.

## Task

Log in on http://localhost:4200/ with credentials from seeds.

1. Store jwt token in user's browser.

2. Add another user to the seeds.

3. Create a simple (1-1) chat using socket.io. Messages should be stored in db.

4. Use jwt token for websocket authentication.

5. Logout and disconnect websocket on token expiration.

## How-to

Generate migration: `npm run migration:generate --name=user`, where name is a new migration's name.
