import { Server } from "socket.io";
import { redisClient } from "./db/redis.js";

export const IO = (server) => {
  const io = new Server(server, {
    transports: ["websocket"],
    cors: {
      origin: "https://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    // Evento de conexão do Socket.IO

    socket.on("login", async (nickname) => {
      const socketId = socket.id;

      try {
        // Verificar se o nickname já está em uso
        const existingUser = await redisClient.get(`nickname:${nickname}`);
        if (existingUser) {
          console.log(`Usuário ${nickname} já está logado.`);
          const onlineUserCount = await redisClient.get("onlineUserCount");
          io.emit("userCountUpdate", onlineUserCount);
          return;
        }

        // Armazenar o nickname do usuário vinculado ao socketId no Redis
        await redisClient.set(`nickname:${nickname}`, socketId);
        console.log(`Usuário ${nickname} conectado.`);

        // Incrementar a contagem de usuários logados
        await redisClient.incr("onlineUserCount");

        // Emitir evento com a contagem atualizada para todos os clientes
        const onlineUserCount = await redisClient.get("onlineUserCount");
        io.emit("userCountUpdate", onlineUserCount);

        // Resto do código após o login

        socket.on("disconnect", async () => {
          try {
            // Evento de desconexão do cliente
            // Remover o nickname do Redis
            await redisClient.del(`nickname:${nickname}`);

            // Decrementar a contagem de usuários logados
            await redisClient.decr("onlineUserCount");
            console.log(`Usuário ${nickname} desconectado.`);

            // Emitir evento com a contagem atualizada para todos os clientes
            const onlineUserCount = await redisClient.get("onlineUserCount");
            io.emit("userCountUpdate", onlineUserCount);
          } catch (error) {
            console.error("Erro ao remover nickname do Redis:", error);
          }
        });
      } catch (error) {
        console.error("Erro ao armazenar nickname no Redis:", error);
        console.log("[ Redis ] -> Cliente desconectado.");
        await redisClient.disconnect();
      }
    });
  });
};
