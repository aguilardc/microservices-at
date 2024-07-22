import Product from "../domain/product";
import ProductRepository from "../domain/product.repository";
import BrokerRepository from "../domain/broker.repository";

export default class ProductApplication {
    readonly orderRepository: ProductRepository;
    readonly brokerRepository: BrokerRepository;

    constructor(orderRepository: ProductRepository, brokerRepository: BrokerRepository) {
        this.orderRepository = orderRepository;
        this.brokerRepository = brokerRepository;
    }

    async listAll(): Promise<Product[]> {
        return await this.orderRepository.listAll();
    }

    async findById(id: string): Promise<Product | null> {
        return await this.orderRepository.findById(id);
    }

    async create(product: Product): Promise<Product> {
        return await this.orderRepository.insert(product);
    }

    async update(productId: string, product: Product): Promise<Product | null> {
        const _product = await this.findById(productId);
        if (!_product) return null;
        _product.productName = product.productName;
        if (product.productPrice) {
            _product.productPrice = product.productPrice
        }
        if (product.productStock) {
            _product.productStock = product.productStock;
        }
        return await this.orderRepository.update(productId, _product);
    }

    async receive() {
        await this.brokerRepository.receive();
        await this.brokerRepository.receiveError();
    }
}