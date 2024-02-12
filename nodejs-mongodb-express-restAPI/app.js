// Server setup
const express = require("express");
require("./mongodb-connection");

const port = 3000;
const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log("server running on port", port);
});
const userRouter = require("./routes/users");
app.use("/users", userRouter);
