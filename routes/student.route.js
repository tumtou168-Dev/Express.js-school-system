const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student.controller");

router.get("/", studentController.getStudents);
router.post("/", studentController.createStudent);

module.exports = router;