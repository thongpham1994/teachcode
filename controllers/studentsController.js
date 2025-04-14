import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import studentRepository from '../repositories/studentRepository.js';
import { MAX_RECORDS } from '../Global/constants.js';


async function getAllStudents(req, res) {

    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query
    if (size >= MAX_RECORDS)
        size = MAX_RECORDS
    else
        size = size

    try {
        let filteredStudents = await studentRepository.getAllStudent({
            size, page, searchString
        })
    
        res.status(HttpStatusCode.OK).json({
            message: 'Get stutdents successfully',
            size: filteredStudents.length,
            page,
            searchString,
            data: filteredStudents
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
   
}

async function getStudentById(req, res) {
    let studentId = req.params.id
    
    try {
       const student = await studentRepository.getDetailStudent(studentId)
       res.status(HttpStatusCode.OK).json({
        message: 'Get detail stutdents successfully',
        data: student
    });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }

}

async function updateStudent(req, res) {
    //res.send('PATCH(create new object if not exists) insert student');
    try {
        const {
            id,
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address
        } = req.body
        const student = await studentRepository.updateStudent(req.body);
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Updated student successfully',
            data: student
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert Student: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function insertStudent(req, res) {
    try {
        const student = await studentRepository.insertStudent(req.body);
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert student successfully',
            data: student
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert Student: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function generateFakeStudents(req, res) {
    await studentRepository.generateFakeStudents(req.body)
    res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Insert fake students successfully',
    })
}

export default {
    getAllStudents,
    getStudentById,
    updateStudent,
    insertStudent,
    generateFakeStudents
}