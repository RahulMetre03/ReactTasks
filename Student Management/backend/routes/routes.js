import express from 'express';
import { getStudentsData, getTeacherData, checkLogin, getMyTeacherData, getMyStudentData, authenticateToken} from '../controllers/controller.js';
const router = express.Router();


router.get('/student', getStudentsData);
router.get('/teacher', getTeacherData);
router.post('/login', checkLogin);

// Use authenticateToken for all protected routes
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You accessed protected route', user: req.user });
});
router.get('/myteacherdata', authenticateToken, getMyTeacherData);
router.get('/mystudentdata', authenticateToken, getMyStudentData);

export default router;