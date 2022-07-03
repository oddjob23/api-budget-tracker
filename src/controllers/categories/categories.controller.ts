import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotAuthorizedError } from "../../errors/NotAuthorizedError";
import { NotFoundError } from "../../errors/NotFoundError";
import { validateRequest } from "../../middlewares/ValidateRequest";
import { CategoryModel } from "../../models/category/category";

const router = Router();

router.get(
  "/",

  async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
      throw new NotAuthorizedError();
    }
    const categories = await CategoryModel.find({ user: user.id });
    res.send(categories);
  }
);

router.post(
  "/",
  [
    body("name")
      .notEmpty()
      .isString()
      .withMessage("A valid category name must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const user = req.user;
    if (!user) {
      throw new NotAuthorizedError();
    }

    try {
      const category = await CategoryModel.create({ name, user: user.id });

      res.status(201).send(category);
    } catch (err) {
      console.log(err);
      throw new BadRequestError(
        "Error creating new category. Please check your data"
      );
    }
  }
);

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (!user) {
    throw new NotAuthorizedError();
  }
  if (!id && typeof id !== "string") {
    throw new BadRequestError("Invalid ID passed in");
  }

  let category;
  try {
    category = await CategoryModel.findOne({ _id: id, user: user.id });
  } catch (err) {
    throw new BadRequestError("There was an error with your request");
  }
  if (!category) {
    throw new NotFoundError();
  }

  res.send(category);
});

router.put(
  "/:id",
  [
    body("name")
      .notEmpty()
      .isString()
      .withMessage("A valid category name must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const { name } = req.body;
    if (!user) {
      throw new NotAuthorizedError();
    }

    if (!id && typeof id !== "string") {
      throw new BadRequestError("Invalid ID passed in as parameter");
    }

    const category = await CategoryModel.findOneAndUpdate(
      { _id: id, user: user.id },
      { name },
      { new: true }
    );

    if (!category) {
      throw new BadRequestError(
        "Error updating category. Please check your data"
      );
    }
    res.send(category);
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (!id && typeof id !== "string") {
    throw new BadRequestError("Invalid ID passed in");
  }
  if (!user) {
    throw new NotAuthorizedError();
  }

  try {
    await CategoryModel.findOneAndDelete({ _id: id, user: user.id });
    res.status(204).send({});
  } catch (err) {
    throw new BadRequestError("Something went wrong");
  }
});

export { router as CategoryRouter };
