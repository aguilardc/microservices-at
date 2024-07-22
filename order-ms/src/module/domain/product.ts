export default class Product {
    productId: string;
    productCount: number;

    constructor(productId: string, productCount: number) {
        this.productId = productId;
        this.productCount = productCount;
    }
}