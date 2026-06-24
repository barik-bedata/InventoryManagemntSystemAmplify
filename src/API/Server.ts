import express from "express";
import { DI } from "./DependencyInjection";
import { CategoryRoutes } from "./Routes/CategoryRoutes";
import { ProductRoutes } from "./Routes/ProductRoutes";

import path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve the frontend static files
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "../public/index.html"));
  console.log(`Server listening at on aws amplify`);
});

app.use("/categories", CategoryRoutes(DI.categoryController));
app.use("/products", ProductRoutes(DI.productController));

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  }); 
}


export { app };
