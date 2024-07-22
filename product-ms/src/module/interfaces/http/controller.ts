import {Request, Response} from "express";
import ProductApplication from "../../application/product.application";
import Product from "../../domain/product";

export default class Controller {
    application: ProductApplication

    constructor(readonly app: ProductApplication) {
        this.application = app;
        this.insert = this.insert.bind(this);
        this.listAll = this.listAll.bind(this);
        this.listById = this.listById.bind(this);
        this.update = this.update.bind(this);
    }

    async listAll(req: Request, res: Response) {
        const listProducts = await this.application.listAll();
        res.json(listProducts);
    }

    async listById(req: Request, res: Response) {
        const product = await this.application.findById(req.params.productId);
        (!product) ? res.status(404).json({message: 'Product Not Found'}) : res.json(product);
    }

    async insert(req: Request, res: Response) {
        const {productName, productPrice, productStock} = req.body;
        const orderInserted = await this.application.create(new Product(productName, productPrice, productStock));
        res.json(orderInserted);
    }

    async update(req: Request, res: Response) {
        const {productName, productPrice, productStock} = req.body;
        const product = await this.application.update(req.params.productId, new Product(productName, productPrice, productStock));
        (!product) ? res.status(404).json({message: 'Product Not Found'}) : res.json(product);
    }
}