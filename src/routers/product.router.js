import { Router } from "express";
import productController from "../controllers/product.controller.js";
import checkToken from "../middlewares/checkToken.js";

const route = Router();

route.get("/products", productController.GET);
route.get("/products/:productId", productController.GET);
route.post("/products", checkToken, productController.POST);
route.put("/products/:productId", checkToken, productController.PUT);
route.delete("/products/:productId", checkToken, productController.DELETE);

export default route;
