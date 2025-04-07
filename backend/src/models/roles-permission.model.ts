import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { Permissions, PermissionType, Roles, RoleType } from "../enums/role.enum";
import { DefaultRolePermissions } from "../utils/default-role-permission";

export interface RoleDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: RoleType;
  permissions: Array<PermissionType>;
}

const roleSchema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
      default: function (this: RoleDocument) {
        return DefaultRolePermissions[this.name];
      },
    },
  },
  {
    timestamps: true,
  }
);

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;
