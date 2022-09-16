import { Router } from "express";
import subCategoriesController from "../controllers/sub-categories.controller.js";
import checkToken from "../middlewares/checkToken.js";

const route = Router();

route.get("/subcategories", subCategoriesController.GET);
route.get("/subcategories/:subCategoryId", subCategoriesController.GET);
route.post("/subcategories", checkToken, subCategoriesController.POST);
route.put(
  "/subcategories/:subCategoryId",
  checkToken,
  subCategoriesController.PUT
);
route.delete(
  "/subcategories/:subCategoryId",
  checkToken,
  subCategoriesController.DELETE
);

export default route;
