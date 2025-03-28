const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Dockerized World!');
});

// Importar y usar las rutas de tareas
const todosRouter = require('./routes/todos');
app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
