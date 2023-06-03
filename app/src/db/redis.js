import { createClient } from 'redis';

const redisClient = createClient({ url: 'redis://redis:6379' });

await redisClient.connect();
// host: process.env.REDIS_HOST,
// port: process.env.REDIS_PORT
redisClient.on("connect", () => {
  console.log("[ Redis ] -> Conectado ao servidor Redis.");
});

redisClient.on('error', err => console.log('Redis Client Error', err))

export { redisClient }
