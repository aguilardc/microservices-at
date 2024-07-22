import Product from "./product";

export default interface ProductRepository {
    listAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    insert(product: Product): Promise<Product>;
    update(productId: string, product: Product): Promise<Product | null>;
}