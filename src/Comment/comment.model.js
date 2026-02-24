'use strict';

import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        publication: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication',
            required: [true, 'La publicación es requerida']
        },
        author: {
            type: String,
            required: [true, 'El autor es requerido']
        },
        content: {
            type: String,
            required: [true, 'El comentario es requerido'],
            trim: true,
            maxLength: [1000, 'El comentario no puede exceder 1000 caracteres']
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

commentSchema.index({ publication: 1 })
commentSchema.index({ author: 1 })

export default mongoose.model('Comment', commentSchema);
