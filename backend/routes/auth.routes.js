import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";

const authRouter = Router();

authRouter.post('/sign-up', signUp)

authRouter.post('/sign-in', signIn)

authRouter.get('/sign-out', signOut)

authRouter.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
});

export default authRouter;