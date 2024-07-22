import BrokerRepository from "../domain/broker.repository";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import EnvironmentVariables from "../../services/app.service";
import ReceiveMessageService from "./services/receive-messages.service";
import OrderInfrastructure from "./order.infrastructure";


export default class BrokerInfrastructure implements BrokerRepository {

    constructor(private readonly orderInfrastructure: OrderInfrastructure) {
    }

    async send(message: any, queue: string): Promise<any> {
        const channel = BrokerBootstrap.Channel;
        await channel.assertQueue(queue, {durable: true});
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async receive(): Promise<any> {
        const channel = BrokerBootstrap.Channel;
        const queueName = EnvironmentVariables.QUEUE_ORDER_SUCCESS_EVENT;
        await ReceiveMessageService.accepted(channel, queueName, this.consumerAccept.bind(this));
    }

    async receiveError(): Promise<any>{
        const channel = BrokerBootstrap.Channel;
        await ReceiveMessageService.rejected(channel, this.consumerReject.bind(this), "*.payment.error");
    }

    async consumerAccept(message: any) {
        const content = JSON.parse(message.content.toString());
        await this.orderInfrastructure.update(content.id, content.status);
        BrokerBootstrap.Channel.ack(message);
    }

    async consumerReject(message: any) {
        const content = JSON.parse(message.content.toString());
        await this.orderInfrastructure.update(content.id, content.status);
        BrokerBootstrap.Channel.ack(message);
    }
}