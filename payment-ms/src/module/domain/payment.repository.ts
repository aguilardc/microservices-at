export default interface PaymentRepository {
    payment(order: any): Promise<any>;
}