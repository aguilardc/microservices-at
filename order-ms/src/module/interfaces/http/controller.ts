import {Request, Response} from "express";
import OrderApplication from "../../application/order.application";
import Order from "../../domain/order";

export default class Controller {
    application: OrderApplication

    constructor(readonly app: OrderApplication) {
        this.application = app;
        this.insert = this.insert.bind(this);
        this.listAll = this.listAll.bind(this);
        this.findById = this.findById.bind(this);
    }

    async listAll(req: Request, res: Response) {
        const orders = await this.application.findAll();
        res.json(orders);
    }

    async findById(req: Request, res: Response) {
        const order = await this.application.findById(req.params.orderId);
        (!order) ? res.status(404).json({message: 'Order Not Found'}) : res.json(order);
    }

    async insert(req: Request, res: Response) {
        const {transactionId, status, products} = req.body;
        const order = new Order(transactionId, status, products);
        const orderInserted = await this.application.create(order);
        res.json(orderInserted);
    }
}