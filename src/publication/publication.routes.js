'use strict'

import { Router } from 'express'

import {
    createPublication,
    getPublications,
    getPublicationById,
    updatePublication,
    deletePublication
} from './publication.controller.js'

import {
    validateCreatePublication,
    validateUpdatePublication,
    validateDeletePublication,
    validateGetPublicationById
} from '../../middlewares/validateCreatePublication.js'

const router  = Router()

router.post('/create', validateCreatePublication, createPublication)

router.get('/get', getPublications)

router.get('/:id', validateGetPublicationById, getPublicationById)

router.put('/update/:id', validateUpdatePublication, updatePublication)

router.delete('/delete/:id', validateDeletePublication, deletePublication)

export default router 