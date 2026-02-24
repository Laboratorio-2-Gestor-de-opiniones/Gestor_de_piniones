'use strict'

import { Router } from "express"

import {
    createComment,
    updateComment,
    deleteComment
} from './comment.controller.js'

import {
    validateCreateComment,
    validateUpdateComment,
    validateDeleteComment
} from '../../middlewares/validateCreateComment.js'

const api = Router()

// Crear comentario
api.post('/create/:publicationId', validateCreateComment, createComment)

// Actualizar comentario
api.put('/update/:id', validateUpdateComment, updateComment)

// Eliminar comentario
api.delete('/delete/:id', validateDeleteComment, deleteComment)

export default api