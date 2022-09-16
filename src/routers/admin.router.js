import { Router } from "express";
import adminController from "../controllers/admin.controller.js";

const route = Router();
route.post("/login", adminController.POST);

export default route;
