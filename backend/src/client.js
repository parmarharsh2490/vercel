// const Redis = require('ioredis');
// REDIS_URL=
// SESSION_SECRET=2a3b7c8e9d1f2b3c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7

import Redis from "ioredis";


const redis = new Redis({
  host: 'redis://@redis-14347.c264.ap-south-1-1.ec2.redns.redis-cloud.com', // Redis server host
  port: 12345,        // Redis server port
  password: 'ErQhheMAxR3akKxw0W08QeEobRZGdLJM', // Redis server password (if any)
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error', err);
});

module.exports = redis;