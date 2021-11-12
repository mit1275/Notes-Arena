// DECLARING MODULES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
const cookieParser = require("cookie-parser");
const http = require("http");
const bodyParser = require("body-parser");
// const sellerRoute = require("./router/SellerRouter.js");
const studentRoute = require("./router/Student.js");

const applicationRunning = require("./router/api.js");
const feedbackRouter = require("./router/Feedbacks.js");


const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");




//DEFINING MODULES
const app = express();
const port = 3001 || process.env.PORT;
const hostname = "localhost";

app.use(cookieParser());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(require("./router/Student"));

// const connection = mongoose.connection;

app.use(express.static("public"));

//VALIDATING MODULES POLICY
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
env.config();

//CONNECTING MONGO DB
const uri =process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

let gfs;

connection.once("open", () => {
  // Init stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename =file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get("/", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render("index", { files: false });
    } else {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render("index", { files: files });
    }
  });
});
// upload.setInterval(function() {
  // body
// }, 1000);
// @route POST /upload
// @desc  Uploads file to DB
app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/");
});

app.post("/allfiles", (req, res) => {
  gfs.files.find({}).toArray((err, files) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json({ files });
  });
});
const jwt=require('jsonwebtoken');



// @route GET /files
// @desc  Display all files in JSON
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files exist
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // File exists
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    // return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    app.post("/searchby", (req, res) => {
      const filename = req.body.name;
      let namePattern = new RegExp(filename, "i");
      gfs.files.find({ filename: namePattern }).exec((err, files) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        return res.json({ files });
      });
    });

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete("/files/:id", (req, res) => {
  gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect("/");
  });
});

// SENDING TO ROUTES
app.use("/api", applicationRunning);
app.use("/api/student", studentRoute);

app.use("/api/feedback", feedbackRouter);

if(process.env.NODE_ENV=="production")
{
  app.use(express.static("Frontend/build"))
}

//STARTING APP
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server Running at http://${hostname}:${port}/`);
});
// cd 