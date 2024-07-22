import BrokerRepository from "../domain/broker.repository";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import EnvironmentVariables from "../../services/app.service";
import ReceiveMessageService from "./services/receive-messages.service";
import ProductInfrastructure from "./product.infrastructure";
import Product from "../domain/product";

export default class BrokerInfrastructure implements BrokerRepository {

    constructor(private readonly productInfrastructure: ProductInfrastructure) {
    }

    async receive(): Promise<any> {
        const channel = BrokerBootstrap.Channel;
        const queueName = EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT;
        await ReceiveMessageService.accepted(channel, queueName, this.consumerAccept.bind(this));
    }

    async receiveError(): Promise<any> {
        const channel = BrokerBootstrap.Channel;
        await ReceiveMessageService.rejected(channel, this.consumerReject.bind(this), "*.payment.error");
    }

    async consumerAccept(message: any) {
        const content = JSON.parse(message.content.toString());
        for (const product of content.data) {
            const _product: Product | null = await this.productInfrastructure.findById(product.productId);
            if (_product) {
                _product.productStock = _product.productStock - product.productCount;
                await this.productInfrastructure.update(product.productId, _product);
            }
        }
        BrokerBootstrap.Channel.ack(message);
    }


    async consumerReject(message: any) {
        const content = JSON.parse(message.content.toString());
        for (const product of content.products) {
            let _product = await this.productInfrastructure.findById(product.productId);
            if (_product) {
                _product.productStock = _product.productStock + product.productCount;
                await this.productInfrastructure.update(product.productId, _product);
            }
        }
        BrokerBootstrap.Channel.ack(message);
    }
}