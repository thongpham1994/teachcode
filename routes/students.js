import express from 'express'
import {
    usersController,
    studentsController
} from '../controllers/index.js';

const router = express.Router();
router.get('/', studentsController.getAllStudents)

router.get('/:id', studentsController.getStudentById)

router.patch('/', studentsController.updateStudent)

router.post('/', studentsController.insertStudent)
//router.post('/generateFakeStudents', studentsController.generateFakeStudents)
export default router