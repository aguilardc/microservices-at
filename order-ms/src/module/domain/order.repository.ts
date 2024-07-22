import Order, {STATUS} from "./order";

export default interface OrderRepository {
    findAll(): Promise<Order[]>;

    findById(id: string): Promise<Order | null>

    insert(order: Order): Promise<Order>;

    update(transactionId: string, status: STATUS): Promise<string>;
}