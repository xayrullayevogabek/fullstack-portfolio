import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: "Blog" },
  text: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});

const Comment = model("Comment", CommentSchema);

export default Comment;
