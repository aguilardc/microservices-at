import PaymentRepository from "../domain/payment.repository";
import BrokerRepository from "../domain/broker.repository";

export default class PaymentInfrastructure implements PaymentRepository {
    brokerRepository: BrokerRepository;

    constructor(brokerRepository: BrokerRepository) {
        this.brokerRepository = brokerRepository;
    }
    async payment(order: any): Promise<any> {
        let totalProducts = 0;
        let message = "";
        let statusCode = 200;
        for (const product of order.products) {
            totalProducts += product.productCount;
        }
        if (totalProducts <= 10) {
            await this.brokerRepository.send({
                "id": order.id,
                "transactionId": order.transactionId,
                "status": "PAID"
            });
            message = "*** Pago satisfactorio ***"
        } else {
            order.status = "CANCELLED";
            await this.brokerRepository.sendError(order);
            message = "** Error al procesar el pago ***";
            statusCode = 409;
        }

        return {
            message,
            statusCode
        };

    }
}