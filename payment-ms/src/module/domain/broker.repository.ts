export default interface BrokerRepository {
    send(message:any): Promise<any>;
    sendError(message:any): Promise<any>;
}