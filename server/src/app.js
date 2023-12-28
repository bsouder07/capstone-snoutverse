import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { yellow, green, blue, red } from "chalk";
import keys from "./config/keys";
import router from "./routes";
import fileupload from "express-fileupload"


const app = express();
const path = require('path');

mongoose
  .connect(keys.db_uri)
  .then(() => console.log(`${green("[Database]")} Connection established`))
  .catch((error) =>
    console.log(`${red("[Database]")} Connection failed:`, error)
  );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",fileupload());

app.use(keys.api_url, router);


app.use(express.static(path.join(__dirname, "..", "public")));


app.listen(keys.port, () =>
  console.log(
    `${green("[Server]")} Server established! Send requests to ${yellow(
      "http://localhost:"
    )}${blue(keys.port)}`
  )
);

