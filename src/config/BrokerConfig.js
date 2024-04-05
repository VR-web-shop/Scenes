import pkg from 'amqplib';
import BrokerService from '../services/BrokerService.js';

const url = process.env.MESSAGE_BROKER_URL;
const queues = [];
let conn = null;
let ch = null;

const addListener = (queueName, callback) => {
    if (queues.includes(queueName)) {
        throw new Error(`Queue ${queueName} is already being listened to.`);
    }

    queues.push(queueName);
    ch.assertQueue(queueName, { durable: false });
    ch.consume(queueName, (msg) => {
        const text = msg.content.toString();
        const json = JSON.parse(text);
        callback(json);
    }, { noAck: true });
};

const removeListener = (queueName) => {
    ch.cancel(queueName);
};

export const connect = async () => {
    conn = await pkg.connect(url);
    ch = await conn.createChannel();

    BrokerService.config.forEach(({ type, callback }) => {
        addListener(type, callback);
    });
}

export const close = async () => {
    await conn.close();
}
