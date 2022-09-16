import { Router } from "express";
import categoriesController from "../controllers/categories.controller.js";
import checkToken from "../middlewares/checkToken.js";

const route = Router();

route.get("/categories", categoriesController.GET);
route.get("/categories/:categoryId", categoriesController.GET);
route.post("/categories", checkToken, categoriesController.POST);
route.put("/categories/:categoryId", checkToken, categoriesController.PUT);
route.delete(
  "/categories/:categoryId",
  checkToken,
  categoriesController.DELETE
);

export default route;
