import { createClient } from 'redis';

const redisClient = createClient({ url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });

await redisClient.connect();

redisClient.on("connect", () => {
  console.log("[ Redis ] -> Conectado ao servidor Redis.");
});

redisClient.on('error', err => console.log('Redis Client Error', err))

export { redisClient }
