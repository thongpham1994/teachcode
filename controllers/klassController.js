import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import klassRepository from '../repositories/klassRepository.js';
import { MAX_RECORDS } from '../Global/constants.js';


async function getAllKlass(req, res) {

    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query
    if (size >= MAX_RECORDS)
        size = MAX_RECORDS
    else
        size = size

    try {
        let filteredKlass = await klassRepository.getAllKlass({
            size, page, searchString
        })
    
        res.status(HttpStatusCode.OK).json({
            message: 'Get class successfully',
            size: filteredKlass.length,
            page,
            searchString,
            data: filteredKlass
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }
   
}

async function getKlassById(req, res) {
    let klassId = req.params.id
    
    try {
       const klass = await klassRepository.getDetailKlass(klassId)
       res.status(HttpStatusCode.OK).json({
        message: 'Get detail class successfully',
        data: klass
    });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message
        })
    }

}

async function updateKlass(req, res) {
    //res.send('PATCH(create new object if not exists) insert student');
    try {
        const {
            id,
            name
        } = req.body
        const klass = await klassRepository.updateKlass(req.body);
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Updated class successfully',
            data: klass
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert class: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function insertKlass(req, res) {
    try {
        debugger
        const klass = await klassRepository.insertKlass(req.body);
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert class successfully',
            data: klass
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert class: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

export default {
    getAllKlass,
    getKlassById,
    updateKlass,
    insertKlass
}