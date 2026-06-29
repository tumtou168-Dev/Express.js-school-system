const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const studentRoute = require("./routes/student.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {

        const conn = await connectDB();

        await conn.close();

        res.send("Student Grade Management System API");
    } catch (err) {
        res.status(500).send("Database Connecttion Failed.");
    }
});

app.use("/students", studentRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});