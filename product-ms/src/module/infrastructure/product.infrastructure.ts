import ProductRepository from "../domain/product.repository";
import Product from "../domain/product";
import Model from "./models/product.model";

export default class ProductInfrastructure implements ProductRepository {
    async listAll(): Promise<Product[]> {
        return Model.find().exec();
    }

    findById(id: string): Promise<Product | null> {
        return Model.findById(id);
    }

    async insert(product: Product): Promise<Product> {
        await Model.create(product);
        return product;
    }

    async update(productId: string, product: Product): Promise<Product | null> {
        await Model.findOneAndUpdate({_id: productId}, product);
        return product;
    }
}