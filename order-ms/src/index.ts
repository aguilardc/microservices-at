import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import app from "./app";
import OrderApplication from "./module/application/order.application";
import OrderInfrastructure from "./module/infrastructure/order.infrastructure";
import BrokerInfrastructure from "./module/infrastructure/broker.infrastructure";
import BrokerController from "./module/interfaces/broker/broker.controller";

const orderApplication = new OrderApplication(new OrderInfrastructure(), new BrokerInfrastructure(new OrderInfrastructure()));

(async () => {
    try {
        const listPromises = [];

        const serverBootstrap = new ServerBootstrap(app);
        const databaseBootstrap = new DatabaseBootstrap();
        const brokerBootstrap = new BrokerBootstrap();
        const brokerController = new BrokerController(orderApplication);

        listPromises.push(serverBootstrap.initialize());
        listPromises.push(databaseBootstrap.initialize());
        listPromises.push(brokerBootstrap.initialize());

        await Promise.all(listPromises);
        await brokerController.listen();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()

