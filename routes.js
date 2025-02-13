// routes.js
const express = require('express');
const router = express.Router();
const connection = require('./db');

// Obtener todos los registros de usuario
router.get('/registros', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});

// Obtener un usuario por su ID
router.get('/registros/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;
    connection.query('SELECT * FROM usuario WHERE id = ?', id_usuario, (err, results) => {
      if (err) {
        console.error('Error al obtener el registro:', err);
        res.status(500).json({ error: 'Error al obtener el registro' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Registro no encontrado' });
        return;
      }
      res.json(results[0]);
    });
});

// Crear un nuevo usuario
router.post('/registros', (req, res) => {
  const nuevoRegistro = req.body;
  connection.query('INSERT INTO usuario SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al crear un nuevo registro:', err);
      res.status(500).json({ error: 'Error al crear un nuevo registro' });
      return;
    }
    res.status(201).json({ message: 'Registro creado exitosamente' });
  });
});

// Actualizar un registro
router.put('/registros/:id', (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  connection.query('UPDATE tb_alumnos SET ? WHERE id = ?', [datosActualizados, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
      return;
    }
    res.json({ message: 'Registro actualizado exitosamente' });
  });
});

// Eliminar un registro
router.delete('/registros/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM tb_alumnos WHERE id = ?', id, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
      return;
    }
    res.json({ message: 'Registro eliminado exitosamente' });
  });
});


// Obtener todos los registros de dos tablas
router.get('/datos', (req, res) => {
  connection.query('SELECT car.id_carrera AS id, car.nombre AS carrera, gru.nombre AS grupo ' +
    'FROM tb_carrera AS car, tb_grupos AS gru ' +
    'WHERE car.id_carrera=gru.id_carrera', (err, results) => {
    if (err) {
      console.error('Error al obtener registros:', err);
      res.status(500).json({ error: 'Error al obtener registros' });
      return;
    }
    res.json(results);
  });
});


module.exports = router;
