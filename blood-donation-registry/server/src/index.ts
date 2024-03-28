import { AppDataSource } from "./data-source";
import express from 'express';
import { getRoutes } from "./routes";

async function main() {
  try {
    await AppDataSource.initialize();
    const app = express();

    app.use(express.json);
    app.use('/api', getRoutes());

    app.listen(3000, () => {
      console.log("Listening on port 3000...");
    });

  } catch (error) {
    console.log(error.message);
  }
}

main();


