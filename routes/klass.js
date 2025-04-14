import express from 'express'
import {
    klassController
} from '../controllers/index.js';

const router = express.Router();
router.get('/', klassController.getAllKlass)

router.get('/:id', klassController.getKlassById)

router.patch('/', klassController.updateKlass)

router.post('/', klassController.insertKlass)
export default router