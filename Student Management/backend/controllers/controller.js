import db from "../config/db.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = "d9f8b3c4a1e27f6d5b8c9e2a1f7d4b6c";

export const getStudentsData = (req, res) => {
    const q = `
        SELECT student.roll_no, student.name, student.blood_group, student.marks,
               marks.eng, marks.maths, marks.sci
        FROM student
        INNER JOIN marks ON student.roll_no = marks.roll_no
    `;

    db.query(q, (err, data) => {
        if (err) {
            console.error('Error fetching student data:', err);
            return res.status(500).json({ error: 'Failed to fetch student data' });
        }
        return res.status(200).json(data);
    });
};

export const getTeacherData = async(req,res) => {
    const q = "SELECT * FROM teacher";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
}

export const checkLogin = async (req, res) => {
    const { username, password } = req.body;

    const q = "SELECT role, user_id FROM users WHERE username = ? AND password = ?";
    db.query(q, [username, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Create JWT token with userId and role
            const token = jwt.sign(
                { userId: user.user_id, role: user.role },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
};

// Single authentication middleware - keep this one
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Malformed token' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user; // contains userId and role from payload
        next();
    });
};

export const getMyTeacherData = (req, res) => {
    const userId = req.user.userId; // extracted from JWT by middleware

    const q = "SELECT * FROM teacher WHERE user_id = ?";

    db.query(q, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Teacher data not found' });
        }

        res.json(results[0]); // send single teacher data object
    });
};

export const getMyStudentData = (req, res) => {
    const userId = req.user.userId; // extracted from JWT by middleware

    const q = `
    SELECT student.roll_no, student.name, student.blood_group, student.marks,
           marks.eng, marks.maths, marks.sci
    FROM student
    INNER JOIN marks ON student.roll_no = marks.roll_no
    WHERE student.user_id = ?
`;


    db.query(q, [userId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Student data not found' });
        }

        res.json(results[0]); // send single student data object
    });
};