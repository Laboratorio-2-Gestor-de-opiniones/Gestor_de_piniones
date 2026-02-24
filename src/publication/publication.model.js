import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es requerido'],
            trim: true,
            maxLength: [150, 'El título no puede exceder 150 caracteres']
        },
        category: {
            type: String,
            required: [true, 'La categoría es requerida'],
            enum: {
                values: ['TECNOLOGIA', 'SOCIEDAD', 'EDUCACION', 'ENTRETENIMIENTO', 'OTROS'],
                message: 'Categoría no válida'
            }
        },
        content: {
            type: String,
            required: [true, 'El contenido es requerido'],
            trim: true,
            maxLength: [2000, 'El contenido no puede exceder 2000 caracteres']
        },
        author: {
            type: String,
            required: [true, 'El autor es requerido']
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

publicationSchema.index({ author: 1 })
publicationSchema.index({ category: 1 })
publicationSchema.index({ isActive: 1 })

export default mongoose.model('Publication', publicationSchema);