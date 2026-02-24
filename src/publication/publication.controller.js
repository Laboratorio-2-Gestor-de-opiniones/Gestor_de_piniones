'use strict'

import Publication from './publication.model.js'

export const createPublication = async (req, res) => {
    try {

        const data = req.body

        const publication = new Publication({
            ...data,
            author: req.user.id
        })

        await publication.save()

        return res.status(201).json({
            success: true,
            message: 'Publicación creada correctamente',
            publication
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear la publicación',
            error: error.message
        })
    }
}

export const getPublications = async (req, res) => {
    try {

        const publications = await Publication.find({ isActive: true })
            .sort({ createdAt: -1 })

        return res.json({
            success: true,
            publications
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones',
            error: error.message
        })
    }
}

export const getPublicationById = async (req, res) => {
    try {

        const { id } = req.params

        const publication = await Publication.findById(id)

        if (!publication || !publication.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            })
        }

        return res.json({
            success: true,
            publication
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al buscar publicación',
            error: error.message
        })
    }
}

export const updatePublication = async (req, res) => {
    try {

        const { id } = req.params
        const data = req.body

        const publication = await Publication.findById(id)

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            })
        }

        if (publication.author != req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No puedes editar esta publicación'
            })
        }

        const updated = await Publication.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        return res.json({
            success: true,
            message: 'Publicación actualizada',
            updated
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar publicación',
            error: error.message
        })
    }
}

export const deletePublication = async (req, res) => {
    try {

        const { id } = req.params

        const publication = await Publication.findById(id)

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            })
        }

        if (publication.author != req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No puedes eliminar esta publicación'
            })
        }

        await Publication.findByIdAndUpdate(id, { isActive: false })

        return res.json({
            success: true,
            message: 'Publicación eliminada'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar publicación',
            error: error.message
        })
    }
}

export const getCommentsByPublication = async (req, res) => {
    try {

        const { publicationId } = req.params

        const comments = await Comment.find({
            publication: publicationId,
            isActive: true
        }).sort({ createdAt: -1 })

        return res.send({
            success: true,
            comments
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error obteniendo comentarios',
            error
        })
    }
}