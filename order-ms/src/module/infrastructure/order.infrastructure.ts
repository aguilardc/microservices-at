import OrderRepository from "../domain/order.repository";
import Order, {STATUS} from "../domain/order";
import Model from "./models/order.model";

export default class OrderInfrastructure implements OrderRepository {

    findAll(): Promise<Order[]> {
        return Model.find().exec();
    }

    findById(id: string): Promise<Order | null> {
        return Model.findById(id);
    }

    async insert(order: Order): Promise<Order> {
        await Model.create(order);
        return order;
    }

    async update(_id: string, status: STATUS): Promise<string> {
        await Model.findOneAndUpdate({_id}, {status});
        return status;
    }
}