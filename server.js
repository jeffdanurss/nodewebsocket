const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3001;

// Servir archivos estáticos (como el HTML y el JavaScript) desde la carpeta 'public'
app.use(express.static('public'));

// Crear un servidor HTTP con Express
const server = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Configurar WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Nuevo cliente conectado');

  // Enviar un mensaje de bienvenida al cliente recién conectado
  ws.send(JSON.stringify({ message: '¡Conexión WebSocket establecida!' }));

  // Escuchar mensajes del cliente
  ws.on('message', (message) => {
    // Convertir el mensaje recibido (Buffer) en un string
    const messageString = message.toString(); // Aquí se convierte el Buffer a un string
    console.log('Mensaje recibido:', messageString); // Ahora se puede utilizar la variable messageString

    // Parsear el mensaje como un objeto JSON
    try {
      const parsedMessage = JSON.parse(messageString);

      // Enviar el mensaje recibido a todos los clientes conectados
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    } catch (err) {
      console.error('Error al parsear el mensaje:', err);
    }
  });

  // Manejo de cierre de la conexión
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});
