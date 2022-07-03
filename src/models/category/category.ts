import mongoose from "mongoose";
import { UserDoc } from "../user/user";

interface ICategoryInput {
  name: string;
  user: string;
}

interface ICategoryDoc extends mongoose.Document {
  name: string;
  user: UserDoc;
  createdAt: Date;
  updatedAt: Date;
}

interface ICategoryModel extends mongoose.Model<ICategoryDoc> {
  insert(inputData: ICategoryInput): ICategoryDoc;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
categorySchema.statics.insert = (insertData: ICategoryInput) => {
  return new CategoryModel(insertData);
};
const CategoryModel = mongoose.model<ICategoryDoc, ICategoryModel>(
  "Category",
  categorySchema
);

export { CategoryModel };
