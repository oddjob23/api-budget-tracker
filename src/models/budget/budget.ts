import mongoose from "mongoose";
import { TransactionDoc } from "../transaction/transaction";
import { UserDoc } from "../user/user";

interface IBudgetInput {
  title: string;
  startAmount: number;
  user: string;
}

interface IBudgetDoc extends mongoose.Document {
  title: string;
  startAmount: number;
  user: UserDoc;
  expenses: TransactionDoc[];
  createdAt: Date;
  updatedAt: Date;
}

interface IBudgetModel extends mongoose.Model<IBudgetDoc> {
  insert(inputData: IBudgetInput): IBudgetDoc;
}

const budgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startAmount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    expenses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

budgetSchema.statics.insert = (inputData: IBudgetInput) => {
  return new BudgetModel(inputData);
};

const BudgetModel = mongoose.model<IBudgetDoc, IBudgetModel>(
  "Budget",
  budgetSchema
);

export { BudgetModel };
