import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 letras']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    trim: true
  },
  rol: {
    type: String,
    enum: {
      values: ['cliente', 'repostero', 'admin'],
      message: 'El rol {VALUE} no existe'
    },
    default: 'cliente'
  },
  puntos: {
    type: Number,
    min: [0, 'Los puntos no pueden ser negativos'],
    default: 0
  },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;