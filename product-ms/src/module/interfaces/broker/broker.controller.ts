import ProductApplication from "../../application/product.application";


export default class BrokerController {
    constructor(private productApplication: ProductApplication) {
    }

    async listen() {
        await this.productApplication.receive();
        console.log("Broker Listening");
    }
}