const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/mongo.connection");
const { errorHandler } = require("./middleware/errorHandler");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

