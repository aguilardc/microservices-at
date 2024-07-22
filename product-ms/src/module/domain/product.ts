export default class Product {
    productName: string;
    productPrice: number;
    productStock: number;

    constructor(productName: string, productPrice: number, productStock: number) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productStock = productStock;
    }
}