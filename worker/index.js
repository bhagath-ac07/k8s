const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
    if (index <2) return 1;
    return fib(index -1) + fib(index -2);
}

sub.on('message', (channel, message) => {
    //redisClient.flushall();
    redisClient.hset('values', message, fib(parseInt(message)));
});
//Subscribe to insert to redis. On insert it will perform above action.
sub.subscribe('insert');
