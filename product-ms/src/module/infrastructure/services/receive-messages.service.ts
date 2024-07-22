import amqp from "amqplib";
import EnvironmentVariables from "../../../services/app.service";

export default class ReceiveMessageService {
    static async accepted(channel: amqp.Channel, queueName: string, cb: (message: any) => void) {
        await channel.assertQueue(queueName, {durable: true});
        await channel.consume(queueName, (message: any) => cb(message), {noAck: false});
    }

    static async rejected(channel: amqp.Channel, cb: (message: any) => void, routingKey: string) {
        await channel.assertExchange(EnvironmentVariables.EXCHANGE_ERROR_EVENT, "topic", {durable: true});
        const assertQueue = await channel.assertQueue("", {exclusive: true});
        await channel.bindQueue(assertQueue.queue, EnvironmentVariables.EXCHANGE_ERROR_EVENT, routingKey);
        await channel.consume(assertQueue.queue, (message: any) => cb(message), {noAck: false});
    }
}