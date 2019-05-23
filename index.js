//add all dependencies/ requirements
const express = require("express");
const app = express();
const massive = require("massive");
app.use(express.json());
require("dotenv").config("massive");
const products_controller = require("./db/products_controller");

//using massive to establish a connection
massive(process.env.CONNECTION_STRING)
  //then we set db on app equal to the instance of my database
  .then(db => {
    app.set("db", db);
    //logging the existance of a connection upon success
    console.log("connected to db");
  }) //catching any errors that might occur and logging them appropriately
  .catch(err => console.log(err));

//actually setting up the endpoints

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

//establishing port
const port = 3000;
app.listen(port, () => console.log(`server listening on port ${port}`));
