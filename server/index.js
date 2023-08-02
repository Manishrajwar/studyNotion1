const express = require("express");
const cors = require('cors');
const app = express();
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();


const PORT = process.env.PORT || 4000;

// middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
  })
)

// connect to cloudinary 
cloudinaryConnect();


const dbConnect = require("./config/database");
dbConnect();



const Profile = require("./routes/Profile");
app.use("/api/v1/profile", Profile);

const user = require("./routes/User");
app.use("/api/v1/auth", user);

const Course = require("./routes/Course");
app.use("/api/v1/course", Course);

const Payments = require("./routes/Payments");
app.use("/api/v1/payment", Payments);

const About = require("./routes/About");
app.use("/api/v1" , About);


app.listen(PORT, () => {
  console.log("app start at port 4000");
});

app.get("/", (req, res) => {
  res.send("this is an get app");
});
