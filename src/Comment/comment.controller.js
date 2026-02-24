'use strict'

import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'

export const createComment = async (req, res) => {
    try {

        const { publicationId } = req.params
        const data = req.body

        const publicationExists = await Publication.findById(publicationId)

        if (!publicationExists) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            })
        }

        const comment = new Comment({
            ...data,
            publication: publicationId,
            author: req.user.id
        })

        await comment.save()

        return res.status(201).json({
            success: true,
            message: 'Comentario agregado',
            comment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear comentario',
            error: error.message
        })
    }
}

export const updateComment = async (req, res) => {
    try {

        const { id } = req.params
        const data = req.body

        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            })
        }

        if (comment.author != req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No puedes editar este comentario'
            })
        }

        const updated = await Comment.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        return res.json({
            success: true,
            message: 'Comentario actualizado',
            updated
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar comentario',
            error: error.message
        })
    }
}

export const deleteComment = async (req, res) => {
    try {

        const { id } = req.params

        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            })
        }

        if (comment.author != req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No puedes eliminar este comentario'
            })
        }

        await Comment.findByIdAndUpdate(id, { isActive: false })

        return res.json({
            success: true,
            message: 'Comentario eliminado'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar comentario',
            error: error.message
        })
    }
}