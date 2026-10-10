import express from 'express';
import mongoose from 'mongoose';
import Usuario from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.log('❌ Error de conexión:', err.message));

// Health Check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Servidor activo',
    timestamp: new Date().toISOString(),
    mongodbConnected: mongoose.connection.readyState === 1
  });
});
 
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});
 
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: 'El id no es válido' });
  }
});
 
app.post('/api/usuarios', async (req, res) => {
  try {
    const nuevo = await Usuario.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const actualizado = await Usuario.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!actualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
 
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const borrado = await Usuario.findByIdAndDelete(req.params.id);
    if (!borrado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'El id no es válido' });
  }
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API en http://localhost:${PORT}`));
