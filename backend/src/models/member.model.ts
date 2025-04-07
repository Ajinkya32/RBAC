import mongoose, { Document, Schema } from "mongoose";

export interface MemberDocument extends Document {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const memberSchema = new Schema<MemberDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel = mongoose.model<MemberDocument>("Member", memberSchema);
export default MemberModel;
