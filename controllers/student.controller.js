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

// update 
exports.updateStudent = async (req, res) => {

    let connection;

    try {

        const sid = req.params.id;

        const {
            sname,
            gender,
            dob,
            study_year,
            academic_year,
            semester,
            class_id
        } = req.body;

        connection = await connectDB();

        const result = await connection.execute(
            `UPDATE STUDENT
             SET
                SNAME = :sname,
                GENDER = :gender,
                DOB = TO_DATE(:dob,'YYYY-MM-DD'),
                STUDY_YEAR = :study_year,
                ACADEMIC_YEAR = :academic_year,
                SEMESTER = :semester,
                CLASS_ID = :class_id
             WHERE SID = :sid`,
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

        if (result.rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.json({
            success: true,
            message: "Student updated successfully."
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


// delete 
exports.deleteStudent = async (req, res) => {

    let connection;

    try {

        const sid = req.params.id;

        connection = await connectDB();

        const result = await connection.execute(
            `DELETE FROM STUDENT
                WHERE SID = :sid`,
            { sid },
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully."
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