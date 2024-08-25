import mongoose, { mongo } from "mongoose";

export function connectdb() {
  try {
    mongoose
      .connect(
        "mongodb+srv://admin:admin@cluster0.ilwbje8.mongodb.net/paytm-100xdevs"
      )
      .then(() => {
        console.log("connected MONGO db");
      });
  } catch (error) {
    console.log(error);
  }
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
});

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  account: {
    type: Number, 
    default: 1000,
  },
});

export const User = mongoose.model("User", userSchema);
export const Account = mongoose.model("Account", accountSchema);
