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
    socket.on("login", async (nickname) => {
      const socketId = socket.id;

      try {
        socket.on("disconnect", async () => {
          try {
            await redisClient.del(`nickname:${nickname}`);
            await redisClient.decr("onlineUserCount");
            console.log(`Usuário ${nickname} desconectado.`);
    
            const onlineUserCount = await redisClient.get("onlineUserCount");
            io.emit("userCountUpdate", onlineUserCount);
            
          } catch (error) {
            console.error("Erro ao remover nickname do Redis:", error);
          }
        });


        const existingUser = await redisClient.get(`nickname:${nickname}`);

        if (existingUser) {
          console.log(`Usuário ${nickname} já está logado.`);
          const onlineUserCount = await redisClient.get("onlineUserCount");
          io.emit("userCountUpdate", onlineUserCount);
          return;
        }

        await redisClient.set(`nickname:${nickname}`, socketId);
        console.log(`Usuário ${nickname} conectado.`);

        await redisClient.incr("onlineUserCount");

        const onlineUserCount = await redisClient.get("onlineUserCount");
        io.emit("userCountUpdate", onlineUserCount);

        // Resto do código após o login

      } catch (error) {
        console.error("Erro ao armazenar nickname no Redis:", error);
        console.log("[ Redis ] -> Cliente desconectado.");
        await redisClient.disconnect();
      }
    });

    socket.on("disconnect", async () => {
      try {
        const onlineUserCount = await redisClient.get("onlineUserCount");
        io.emit("userCountUpdate", onlineUserCount);
      } catch (error) {
        console.error("Erro ao remover nickname do Redis:", error);
      }
    });

  });
};
