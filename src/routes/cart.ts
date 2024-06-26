import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "../controllers/cart";

const cartRouters: Router = Router();

cartRouters.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRouters.get("/", [authMiddleware], errorHandler(getCart));
cartRouters.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));
cartRouters.put("/:id", [authMiddleware], errorHandler(changeQuantity));

export default cartRouters;