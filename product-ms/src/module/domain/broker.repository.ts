export default interface BrokerRepository {
    receive(): Promise<any>;
    receiveError(): Promise<any>
}