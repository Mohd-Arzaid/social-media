import mongoose from "mongoose";

const  chatSchema = new mongoose.Schema(
  {
    participants:[
        {
            type:mongoose.Schema.Types.ObjectID,
            ref:"User",
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectID,
            ref:"Message",
        }
    ],

    lastModified:{
        type:Date,
        default:Date.now,
    }


  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
