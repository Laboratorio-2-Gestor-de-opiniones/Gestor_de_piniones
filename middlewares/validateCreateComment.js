import { body, param } from 'express-validator';
import { checkValidators } from './checkValidators.js';
import { validateJWT } from './validate-JWT.js';

// Crear comentario
export const validateCreateComment = [
    validateJWT,
    param('publicationId')
        .isMongoId()
        .withMessage('ID de publicación inválido'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('El comentario es requerido')
        .isLength({ min: 1, max: 1000 })
        .withMessage('El comentario no puede exceder 1000 caracteres'),

    checkValidators
];

// Actualizar comentario
export const validateUpdateComment = [
    validateJWT,
    param('id')
        .isMongoId()
        .withMessage('ID inválido'),

    body('content')
        .optional()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Comentario inválido'),

    checkValidators
];

// Eliminar comentario
export const validateDeleteComment = [
    validateJWT,
    param('id')
        .isMongoId()
        .withMessage('ID inválido'),

    checkValidators
];