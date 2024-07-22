import Product from "./product";

export type STATUS = "PENDING" | "PAID" | "CANCELLED";

export default class Order {
    transactionId: string;
    status: STATUS;
    products!: Product[];

    constructor(transactionId: string, status: STATUS, products: Product[]) {
        this.transactionId = transactionId;
        this.status = status;
        this.products = products;
    }
}