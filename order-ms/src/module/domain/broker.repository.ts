export default interface BrokerRepository {
    send(message: any, queue: string): Promise<any>;
    receive(): Promise<any>;
    receiveError(): Promise<any>;
}