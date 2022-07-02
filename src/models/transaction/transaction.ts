import mongoose from "mongoose";
import { UserDoc } from "../user/user";
interface ITransactionInput {
  user: string;
  amount: number;
  name: string;
  description?: string;
  date?: Date;
}

interface TransactionModel extends mongoose.Model<TransactionDoc> {
  insert(inputData: ITransactionInput): TransactionDoc;
}

interface TransactionDoc extends mongoose.Document {
  user: UserDoc;
  amount: number;
  name: string;
  description: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.statics.insert = (insertData: ITransactionInput) => {
  return new TransactionModel(insertData);
};

const TransactionModel = mongoose.model<TransactionDoc, TransactionModel>(
  "Transaction",
  transactionSchema
);

export { TransactionModel };
