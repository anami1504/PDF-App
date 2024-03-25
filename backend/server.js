const express = require("express")
const app = express();
const mongoose = require("mongoose")
const multer = require("multer")
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files", express.static("files"))

const mongoUrl = "mongodb://localhost:27017/PDF-app";

//db connection
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to database");
}).catch((error) =>
    console.log(error)
)


//multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})


require("./model/pdfDetails")
const pdfSchema = mongoose.model("pdfDetails")

const upload = multer({ storage: storage });


app.post("/upload", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await pdfSchema.create({ title: title, pdf: fileName })
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ staus: error })
    }

})

app.get("/getdata", async (req, res) => {
    try {
        pdfSchema.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        })
    } catch (error) {
        console.log(error)
    }
})

//api
app.get("/", async (req, res) => {
    res.send("Success!!")
})
app.listen(5000, () => {
    console.log("Server started");
})