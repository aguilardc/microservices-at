import Order, {STATUS} from "../domain/order";
import OrderRepository from "../domain/order.repository";
import BrokerRepository from "../domain/broker.repository";
import EnvironmentVariables from "../../services/app.service"
import Product from "../domain/product";

export default class OrderApplication {
    readonly orderRepository: OrderRepository;
    readonly brokerRepository: BrokerRepository;

    constructor(orderRepository: OrderRepository, brokerRepository: BrokerRepository) {
        this.orderRepository = orderRepository;
        this.brokerRepository = brokerRepository;
    }

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.findAll();
    }

    async findById(id: string): Promise<Order | null> {
        return await this.orderRepository.findById(id)
    }

    async create(order: Order): Promise<Order> {
        const _order = await this.orderRepository.insert(order);
        await this.brokerRepository.send({
            type: EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT,
            data: _order.products
        }, EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT)
        return _order;
    }

    async update(transactionId: string, status: STATUS): Promise<string> {
        return this.orderRepository.update(transactionId, status);
    }

    async receive() {
        await this.brokerRepository.receive();
        await this.brokerRepository.receiveError();
    }
}