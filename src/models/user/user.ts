import mongoose from "mongoose";
import { toHash } from "./utils";

interface IUserInput {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  insert(inputData: IUserInput): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
