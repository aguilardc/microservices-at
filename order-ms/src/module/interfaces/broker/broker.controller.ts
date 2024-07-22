import OrderApplication from "../../application/order.application";


export default class BrokerController {
    constructor(private orderApplication: OrderApplication) {
    }

    async listen() {
        await this.orderApplication.receive();
        console.log("Broker Listening");
    }
}