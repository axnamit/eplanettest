const express = require("express");
const baseRoutes = require("./routes/routes");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/api", baseRoutes);

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
