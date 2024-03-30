import { AppDataSource } from "./data-source";
import express from 'express';
import { getRoutes } from "./routes";
import boolParser from 'express-query-boolean';
import { handleAuthorizationError } from "./protect-routes";

async function main() {
  try {
    await AppDataSource.initialize();

    const app = express();

    app.use(express.json());
    //Booleans passed in query parameters don't get mistaken for strings
    app.use(boolParser());
    app.use('/api', getRoutes(), handleAuthorizationError);

    app.listen(3000, () => {
      console.log("Listening on port 3000...");
    });

  } catch (error) {
    console.log(error);
  }
}

main();


