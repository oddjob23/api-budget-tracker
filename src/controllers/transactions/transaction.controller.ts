import { Request, Response, Router } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { BadRequestError } from "../../errors/BadRequestError";
import { NotAuthorizedError } from "../../errors/NotAuthorizedError";
import { NotFoundError } from "../../errors/NotFoundError";

import { validateRequest } from "../../middlewares/ValidateRequest";
import { TransactionModel } from "../../models/transaction/transaction";

const router = Router();

interface InputData {
  name: string;
  amount: number;
  description?: string;
  date?: Date;
  user: string;
  category?: string;
}

router.post(
  "/",

  [
    body("amount")
      .isNumeric()
      .withMessage("A valid amount, greater than 0, must be provided"),
    body("name")
      .isLength({ min: 4, max: 120 })
      .withMessage(
        "A name must be provided. Length of name must be between 4 and 120 characters"
      ),
    body("description").optional().isString().notEmpty(),
    body("date").optional(),
    body("category").optional().isString().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { amount, name, description, date, category } = req.body;
    const user = req.user;

    if (!user) {
      throw new BadRequestError("Invalid request. Please try again later");
    }

    const inputData: InputData = {
      amount,
      name,
      user: user.id,
    };
    if (description) {
      inputData.description = description;
    }
    if (date) {
      inputData.date = date;
    }
    if (category) {
      inputData.category = category;
    }
    try {
      const transaction = await TransactionModel.insert(inputData);
      await transaction.save();
      res.status(201).send(transaction);
    } catch (err) {
      console.log(err);
      throw new BadRequestError("Something went wrong");
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new NotAuthorizedError();
  }
  const transactions = await TransactionModel.find({ userId: user.id });

  res.send(transactions);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    throw new NotAuthorizedError();
  }
  if (!id || typeof id !== "string") {
    throw new BadRequestError("Invalid ID passed as parameter");
  }
  let transaction;
  try {
    transaction = await TransactionModel.findById(id).populate("user");
  } catch (err) {
    throw new BadRequestError("Invalid request");
  }

  if (!transaction) {
    throw new NotFoundError();
  }

  if (transaction.user._id.toString() !== user.id) {
    throw new BadRequestError("Something went wrong");
  }

  res.send(transaction);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, name, description, category } = req.body;
  const user = req.user;

  if (!user) {
    throw new NotAuthorizedError();
  }
  if (!id && typeof id !== "string") {
    throw new BadRequestError("Invalid ID passed in as parameter");
  }
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Invalid request");
  }

  let transaction;
  try {
    const data: any = {};
    if (amount > 0) {
      data.amount = amount;
    }
    if (name) {
      data.name = name;
    }
    if (description) {
      data.description = description;
    }
    if (category) {
      data.category = category;
    }

    transaction = await TransactionModel.findOneAndUpdate({ id }, data, {
      new: true,
    });
  } catch (err) {
    throw new BadRequestError("Invalid request");
  }
  if (!transaction) {
    throw new NotFoundError();
  }

  if (transaction.user._id.toString() !== user.id) {
    throw new BadRequestError("Something went wrong");
  }
  res.send(transaction);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id && typeof id !== "string") {
    throw new BadRequestError("Invalid ID passed in as parameter");
  }

  if (!req.user) {
    throw new NotAuthorizedError();
  }

  let transaction;
  try {
    transaction = await TransactionModel.findOne({ id }).populate("user");
  } catch (err) {
    throw new BadRequestError("There was an error with your request");
  }

  if (!transaction) {
    throw new NotFoundError();
  }

  if (transaction.user._id.toString() !== req.user.id) {
    throw new BadRequestError("Something went wrong");
  }
  await TransactionModel.deleteOne({ id });
  res.status(204).send({});
});

export { router as TransactionRotuer };
