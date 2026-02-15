const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// ดึงไฟล์ course.js มาใช้งาน (เดี๋ยวเราจะสร้างไฟล์นี้ต่อ)
const course = require('./course');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ตั้ง path หลักให้เป็น /course ตามโจทย์
app.use('/course', course);

app.listen(port, () => {
    console.log('Server run at port ' + port);
});