import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/BadRequestError";
import { InternalServerError } from "../../errors/InternalServerError";
import { NotAuthorizedError } from "../../errors/NotAuthorizedError";
import { NotFoundError } from "../../errors/NotFoundError";
import { validateRequest } from "../../middlewares/ValidateRequest";
import { BudgetModel } from "../../models/budget/budget";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new NotAuthorizedError();
  }
  try {
    const budgets = await BudgetModel.find({ user: user.id });
    res.send(budgets);
  } catch (err) {
    throw new BadRequestError(
      "There was an error with your request. Please try again"
    );
  }
});

router.post(
  "/",
  [
    body("title").isString().withMessage("A valid e-mail must be provided"),
    body("startAmount")
      .isNumeric()
      .withMessage("A valid start amount must be provided"),
  ],
  validateRequest,

  async (req: Request, res: Response) => {
    const { title, startAmount } = req.body;
    const user = req.user;
    if (!user) {
      throw new NotAuthorizedError();
    }
    let budget;
    try {
      const budget = await BudgetModel.insert({
        title,
        startAmount,
        user: user.id,
      });
      await budget.save();
      res.status(201).send(budget);
    } catch (err) {
      console.log(err);
      throw new InternalServerError("Error creating new budget");
    }
    if (!budget) {
      throw new BadRequestError(
        "Unable to save budget. Please check your data"
      );
    }
  }
);
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  if (!id && typeof id !== "string") {
    throw new BadRequestError("Invalid ID passed in as parameter");
  }
  if (!user) {
    throw new NotAuthorizedError();
  }
  let budget;
  try {
    budget = await BudgetModel.findOne({ _id: id, user: user.id });
  } catch (err) {
    throw new InternalServerError("Error fetching budget for given ID");
  }
  if (!budget) {
    throw new NotFoundError();
  }
  res.send(budget);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, expenses, startAmount } = req.body;
  const user = req.user;
  if (!id && typeof id !== "string") {
    throw new BadRequestError("Invalid ID passed in as parameter");
  }
  if (!user) {
    throw new NotAuthorizedError();
  }
  let budget;
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Invalid body passed in");
  }
  try {
    const data: any = {};
    if (title) {
      data.title = title;
    }
    if (expenses && expenses.length > 0) {
      data.expenses = expenses;
    }
    if (startAmount) {
      data.startAmount = startAmount;
    }

    budget = await BudgetModel.findOneAndUpdate(
      { _id: id, user: user.id },
      data,
      { new: true }
    );
  } catch (err) {
    throw new BadRequestError("Something went wrong");
  }
  if (!budget) {
    throw new NotFoundError();
  }
  res.send(budget);
});
export { router as BudgetRouter };
