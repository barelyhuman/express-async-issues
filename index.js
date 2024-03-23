const express = require("express");

const app = express();

app.use(express.json());

app.orgId = -1;

app.post("/", async (req, res) => {
  console.log({ body: req.body });
  app.orgId = req.body.id;
  // uncomment to cause the break
  // await new Promise((r) => setTimeout(r, 1000));
  res.write(`${app.orgId}`);
  res.end();
  return;
});

app.listen(3000);
