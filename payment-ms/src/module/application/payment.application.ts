import BrokerRepository from "../domain/broker.repository";
import PaymentRepository from "../domain/payment.repository";

export default class PaymentApplication {
    readonly paymentRepository: PaymentRepository;
    readonly brokerRepository: BrokerRepository;

    constructor(paymentRepository: PaymentRepository, brokerRepository: BrokerRepository) {
        this.paymentRepository = paymentRepository;
        this.brokerRepository = brokerRepository;
    }

    async payment(order: any){
        return await this.paymentRepository.payment(order);
    }
}