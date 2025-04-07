import mongoose, { Document, Schema } from "mongoose";

export interface TeamDocument extends Document {
  name: string;
  manager: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, trim: true },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeamModel = mongoose.model<TeamDocument>("Team", teamSchema);

export default TeamModel;
