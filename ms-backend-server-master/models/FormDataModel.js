// models/FormDataModel.js
const mongoose = require("mongoose");

const formDataSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    availableTime: { type: String, required: true },
    description: { type: String, required: true },
    selectedDate: { type: String, required: true },
  },
  { timestamps: true }
);

const FormDataModel = mongoose.model("FormData", formDataSchema);

module.exports = FormDataModel;
