import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { yellow, green, blue, red } from "chalk";
import keys from "./config/keys";
import router from "./routes";

const app = express();

mongoose
  .connect(keys.db_uri)
  .then(() => console.log(`${green("[Database]")} Connection established`))
  .catch((error) =>
    console.log(`${red("[Database]")} Connection failed:`, error)
  );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(keys.api_url, router);

app.listen(keys.port, () =>
  console.log(
    `${green("[Server]")} Server established! Send requests to ${yellow(
      "http://localhost:"
    )}${blue(keys.port)}`
  )
);

