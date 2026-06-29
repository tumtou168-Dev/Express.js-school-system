const connectDB = require("../config/database");


// GET All Students
exports.getStudents = async (req, res) => {
    let connection;

    try {
        connection = await connectDB();

        const result = await connection.execute(
            `SELECT * FROM STUDENT`
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

exports.createStudent = async (req, res) => {
    console.log("BODY =", req.body);

    res.json(req.body);

    let connection;

    try {

        const {
            sid,
            sname,
            gender,
            dob,
            study_year,
            academic_year,
            semester,
            class_id
        } = req.body;

        if (!sid || !sname || !class_id) {
            return res.status(400).json({
                success: false,
                message: "SID, SNAME and CLASS_ID are required."
            });
        }

        connection = await connectDB();

        await connection.execute(
            `INSERT INTO STUDENT
            (SID,SNAME,GENDER,DOB,STUDY_YEAR,ACADEMIC_YEAR,SEMESTER,CLASS_ID)
            VALUES
            (:sid,:sname,:gender,
                TO_DATE(:dob,'YYYY-MM-DD'),
                :study_year,:academic_year,:semester,:class_id)`,
            {
                sid,
                sname,
                gender,
                dob,
                study_year,
                academic_year,
                semester,
                class_id
            },
            { autoCommit: true }
        );

        res.status(201).json({
            success: true,
            message: "Student created successfully."
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