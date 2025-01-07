import mongoose from "mongoose";

const assistantSchema = new mongoose.Schema(
  {
    assistantId: {
      type: String,
      required: true
    },
    assistantModel : {
      type : String,
      required : true
    },
    assistantName: {
      type: String,
      required: true
    },
  }, { timestamps: true });

// Add indexes for better query performance
assistantSchema.index({ workshop: 1 });
assistantSchema.index({ assistantName: 1 });

const Assistant = mongoose.model("Assistant", assistantSchema);
export default Assistant
