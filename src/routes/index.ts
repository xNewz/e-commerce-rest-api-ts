import { Router } from "express";
import authRoutes from "./auth";
import productsRoutes from "./products";
import usersRoutes from "./users";
import cartRouters from "./cart";
import orderRoutes from "./orders";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes);
rootRouter.use("/users", usersRoutes);
rootRouter.use("/carts", cartRouters);
rootRouter.use("/orders", orderRoutes);

export default rootRouter;
