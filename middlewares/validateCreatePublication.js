import { body, param } from 'express-validator';
import { checkValidators } from './checkValidators.js';
import { validateJWT } from './validate-JWT.js';

// Crear publicación
export const validateCreatePublication = [
    validateJWT,
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título es requerido')
        .isLength({ min: 3, max: 150 })
        .withMessage('El título debe tener entre 3 y 150 caracteres'),

    body('category')
        .notEmpty()
        .withMessage('La categoría es requerida')
        .isIn(['TECNOLOGIA', 'SOCIEDAD', 'EDUCACION', 'ENTRETENIMIENTO', 'OTROS'])
        .withMessage('Categoría no válida'),

    body('content')
        .trim()
        .notEmpty()
        .withMessage('El contenido es requerido')
        .isLength({ min: 5, max: 2000 })
        .withMessage('El contenido debe tener entre 5 y 2000 caracteres'),

    checkValidators
];

// Actualizar publicación
export const validateUpdatePublication = [
    validateJWT,
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido'),

    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 150 })
        .withMessage('El título debe tener entre 3 y 150 caracteres'),

    body('category')
        .optional()
        .isIn(['TECNOLOGIA', 'SOCIEDAD', 'EDUCACION', 'ENTRETENIMIENTO', 'OTROS'])
        .withMessage('Categoría no válida'),

    body('content')
        .optional()
        .trim()
        .isLength({ min: 5, max: 2000 })
        .withMessage('Contenido inválido'),

    checkValidators
];

// Eliminar publicación
export const validateDeletePublication = [
    validateJWT,
    param('id')
        .isMongoId()
        .withMessage('ID inválido'),

    checkValidators
];

// Obtener por id
export const validateGetPublicationById = [
    param('id')
        .isMongoId()
        .withMessage('ID inválido'),

    checkValidators
];