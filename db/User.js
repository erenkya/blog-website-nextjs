import { Schema, model, models } from "mongoose";
const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: [true, "Email already exist"],
            required: [true, "Email is required"],
        },
        username: {
            type: String,
            unique: [true, "Username already exist"],
            required: [true, "Username is required"],
        },
        // İkinci username tanımı bu satırı kaldırmalısın
        // username: {
        //   type: String,
        // },
        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Blog",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);

export default User;
