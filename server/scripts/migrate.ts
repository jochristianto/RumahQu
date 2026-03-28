import { runMigrations } from "../src/db/migrate.js";
import { closePool } from "../src/db/pool.js";

runMigrations()
  .then(async () => {
    console.log("Database migrations applied successfully.");
    await closePool();
  })
  .catch(async (error) => {
    console.error(error);
    await closePool();
    process.exit(1);
  });
