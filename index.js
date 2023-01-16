const express = require("express");
const app = express();
app.use(express.json());

const customers = [
  {
    firstName: "John",

    age: 27,
    id: 1,
  },

  {
    firstName: "James",

    age: 32,
    id: 2,
  },

  {
    firstName: "Robert",

    age: 45,
    id: 3,
  },
];

app.get("/api/customers", (req, resp) => {
  resp.send(customers);
});

app.get("/api/customers/:customerName", (req, resp) => {
  const customer = customers.find(
    (name) => name.firstName == req.params.customerName
  );
  if (!customer) resp.status(404).send("No customer found of given name");
  resp.send(customer);
});

app.get("/api/customers/age/:customerAge", (req, resp) => {
  const customer = customers.find(
    (name) => name.age == parseInt(req.params.customerAge)
  );
  if (!customer) resp.status(404).send("No customer found of given name");
  resp.send(customer);
});

app.post("/api/customers/addcustomer", (req, resp) => {
  /*if (!req.body.firstName)
    resp.status(404).send("Please add data in the firstName");*/
  const customer = {
    firstName: req.body.firstName,
    age: req.body.age,
    id: (customers.length += 1),
  };
  customers.push(customer);
  resp.send("the data has been added");
});

app.put("/api/customers/edit/:id", (req, resp) => {
  const customerById = customers.find((v) => v.id === parseInt(req.params.id));
  if (!customerById) resp.status(404).send("no customer found of given ID");
  customerById.firstName = req.body.firstName;
  customerById.age = req.body.age;
  resp.send(customerById);
});

app.delete("/api/customers/delete/:id", (req, resp) => {
  const customerById = customers.find((v) => v.id === parseInt(req.params.id));
  if (!customerById) resp.status(404).send("no customer found of given ID");
  const index = customers.indexOf(customerById);
  customers.splice(index, 1);
  resp.send(customerById);
});

app.listen(3000);
