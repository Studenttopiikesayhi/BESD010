const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// เชื่อมต่อ database (ใช้รหัส 1234 ตามที่เราตั้งใน Docker)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'se_course_db'
});

db.connect((err) => {
    if (err) {
        console.log('Connect Error: ' + err);
    } else {
        console.log('Database Connected OK!');
    }
});

// 1. ดึงข้อมูลทั้งหมด
router.get('/list', (req, res) => {
    let sql = 'SELECT * FROM online_course';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 2. ค้นหาตาม ID
router.get('/search/id', (req, res) => {
    let id = req.query.courseId;
    let sql = 'SELECT * FROM online_course WHERE course_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0] || {});
    });
});

// 3. ดึงข้อมูลเฉพาะที่ promote เป็น true (1)
router.get('/promote', (req, res) => {
    let sql = 'SELECT * FROM online_course WHERE promote = 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 4. เพิ่มข้อมูลใหม่
router.post('/create', (req, res) => {
    let data = req.body;
    let sql = 'INSERT INTO online_course SET ?';
    db.query(sql, data, (err, result) => {
        if (err) {
            res.json({ result: 0 });
        } else {
            res.json({ result: 1 });
        }
    });
});

// 5. แก้ไขข้อมูล
router.put('/update', (req, res) => {
    let d = req.body;
    let sql = `UPDATE online_course SET 
               title=?, description=?, duration=?, lecturer=?, 
               category=?, promote=?, course_image=? 
               WHERE course_id=?`;
    let params = [d.title, d.description, d.duration, d.lecturer, d.category, d.promote, d.course_image, d.course_id];

    db.query(sql, params, (err, result) => {
        if (err || result.affectedRows === 0) res.json({ result: 0 });
        else res.json({ result: 1 });
    });
});

// 6. ลบข้อมูล
router.delete('/delete', (req, res) => {
    let id = req.body.courseId || req.query.courseId;
    let sql = 'DELETE FROM online_course WHERE course_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err || result.affectedRows === 0) res.json({ result: 0 });
        else res.json({ result: 1 });
    });
});

module.exports = router;