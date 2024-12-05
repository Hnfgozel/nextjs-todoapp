import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
    match: [/.+@.+\..+/, "email invalid!"],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;
