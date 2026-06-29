const oracledb = require("oracledb");

async function connectDB() {
    try {
        const connection = await oracledb.getConnection({
            user: "C##SCHOOLSYS",
            password: "2004",
            connectString: "localhost:1521/ORCL"
        });

        console.log("Oracle Database Connected");

        return connection;

    } catch (err) {
        console.error("Database Connection Error");
        console.error(err);

        throw err;
    }
}

module.exports = connectDB;