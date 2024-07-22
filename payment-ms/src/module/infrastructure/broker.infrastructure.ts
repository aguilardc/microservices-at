import BrokerRepository from "../domain/broker.repository";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import EnvironmentVariables from "../../services/app.service";

export default class BrokerInfrastructure implements BrokerRepository {

    async send(message: any): Promise<any> {
        const channel = BrokerBootstrap.Channel;
        const queueName = EnvironmentVariables.QUEUE_ORDER_SUCCESS_EVENT;
        await channel.assertQueue(queueName, {durable: true});
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    }

    async sendError(message: any): Promise<any> {
        const channel = BrokerBootstrap.Channel;
        const exchangeName = EnvironmentVariables.EXCHANGE_ERROR_EVENT;
        await channel.assertExchange(exchangeName, "topic", {durable: true});
        channel.publish(exchangeName, "*.payment.error", Buffer.from(JSON.stringify(message)));
    }

}