const mongoose = require("mongoose");
const pdfSchema = new mongoose.Schema({
    pdf: String,
    title: String
}, { collection: "PdfDetails" })

mongoose.model("pdfDetails", pdfSchema)