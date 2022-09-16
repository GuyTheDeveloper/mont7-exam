import express from "express";
import categoriesRoute from "./routers/categories.router.js";
import subCategoriesRouter from "./routers/sub-categories.router.js";
import productRouter from "./routers/product.router.js";
import adminRouter from "./routers/admin.router.js";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(adminRouter);
app.use(categoriesRoute);
app.use(subCategoriesRouter);
app.use(productRouter);

app.listen(PORT, () => console.log(`server working on ${PORT}`));
