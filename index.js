const express = require("express");

let cors = require("cors");
const app = express();
const port = 3001;

const { PrismaClient } = require(".prisma/client");
const { json } = require("express");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const prisma = new PrismaClient();


app.post("/createProduct", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const details = req.body.details;
  const cat_id = req.body.cat_id;
  await prisma.products.create({
    data: {
      name: name,
      price: parseInt(price),
      details: details,
      image: image,
      cat_id: cat_id,
    },
  });
  console.log(name);
  res.send(name);
});
app.post("/cart", async (req, res) => {
  const senddata = req.body.senddata;
const sendaddres =req.body.sendaddres;
const Customername =req.body.Customername;
  console.log(senddata);
  await prisma.cart.create({
    data: {
      cartProducts: senddata,
      sendaddres:sendaddres
,      Customername:Customername
    },
  });
  res.send(senddata);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.get("/Product", async (req, res) => {
  const list = await prisma.products.findMany();
  res.send(list);
});

app.get("/Products", async (req, res) => {
  const list = await prisma.products.findMany();
  res.send(list);
});

app.get("/cat", async (req, res) => {
  const cat = req.query.cat;
  console.log(cat);
  const list = await prisma.category.findMany({});

  res.send(list);
});

app.post("/addcat", async (req, res) => {
  const cat = req.query.cat;
  const name = req.body.name;
  const image = req.body.image;
  console.log(cat);
  const list = await prisma.category.create({
    data: {
      name: name,

      image: image,
    },
  });

  res.send(list);
});

app.get("/categor", async (req, res) => {
  const categor = req.query.categor;
  console.log(categor);
  const list = await prisma.products.findMany({
    where: { cat_id: parseInt(categor) },
  });

  res.send(list);
});

app.get("/inProduct", async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const list = await prisma.products.findMany({
    where: { id: parseInt(id) },
  });

  res.send(list);
});
app.get("/search", async (req, res) => {
  const name = req.query.name;
  console.log(name);
  const list = await prisma.products.findMany({
    where: { name: { contains: name } },
  });

  res.send(list);
});

app.get("/item", async (req, res) => {
  const prolist = req.query.prolist;
  console.log(prolist);
  const list = await prisma.products.findMany({});

  res.send(list);
});

app.get("/orders", async (req, res) => {
  const list = await prisma.cart.findMany();
  res.send(list);
});
//کب شده از اونور

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    await prisma.users.create({ data: { name: name } });
  } catch (error) {
    console.log(error);
  }
  res.send({ status: "status" });
});

app.get("/products", async (req, res) => {
  console.log(name);
  await prisma.products.create({
    data: { name: "l" },
  });
  res.send("l,afgggmv");
});
app.get("/deleteProduct", async (req, res) => {
  const id = req.query.id;
  console.log(id);

  await prisma.products.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send("l,afgggmv");
});
// گرفتن داده های یک محصول
app.get("/getProduct", async (req, res) => {
  const id = req.query.id;
  console.log(id);

  const pro = await prisma.products.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  res.send(pro);
});
//اعمال تغییرات

app.post("/editProduct", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const details = req.body.details;
  const price = req.body.price;
  const image = req.body.image;
  console.log(name);

  await prisma.products.update({
    where: { id: parseInt(id) },
    data: {
      name: name,
      details: details,
      price: parseInt(price),
      image: image,
    },
  });
  res.send("l,afgggmv");
});

app.post("/orders", async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    const id = req.body.id;
    const lastname = req.body.lastname;
    const addr = req.body.addr;
    const mobile = req.body.mobile;
    await prisma.orders.create({
      data: {
        name: name,
        id: parseInt(id),
        lastname: lastname,
        addr: addr,
        mobile: parseInt(mobile),
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.send("ali");
});
app.get("/mahsolcode", async (req, res) => {
  const id = req.query.id;
  console.log(id);

  const pro = await prisma.products.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  res.send(pro);
});
