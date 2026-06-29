const connectDB = require("../config/database");

exports.getReport = async (req, res) => {

    let connection;

    try {

        connection = await connectDB();

        const result = await connection.execute(
            `SELECT * FROM VW_STUDENT_REPORT`
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    } finally {

        if (connection) {
            await connection.close();
        }

    }

};