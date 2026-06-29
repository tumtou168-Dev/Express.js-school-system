const connectDB = require("../config/database");

exports.getStudents = async (req, res) => {
    try {

        const conn = await connectDB();

        const result = await conn.execute(
            `SELECT * FROM STUDENT`
        );

        await conn.close();

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }
};