import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { erroeHandler } from "../error-handler";

const authRoutes: Router = Router();

authRoutes.post("/signup", erroeHandler(signup));
authRoutes.post("/login", erroeHandler(login));

export default authRoutes;
