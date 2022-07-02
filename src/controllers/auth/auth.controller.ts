import { Router, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../errors/BadRequestError";
import { validateRequest } from "../../middlewares/ValidateRequest";
import { User } from "../../models/user/user";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("A valid e-mail must be provided"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 32 })
      .withMessage("A valid password must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError(
        "There was an error with your request. Please check your e-mail address or password"
      );
    }

    const user = await User.insert({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    return res.status(201).send(user);
  }
);

export { router as AuthenticationRouter };
