import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import app from "./app";
import ProductApplication from "./module/application/product.application";
import ProductInfrastructure from "./module/infrastructure/product.infrastructure";
import BrokerInfrastructure from "./module/infrastructure/broker.infrastructure";
import BrokerController from "./module/interfaces/broker/broker.controller";

const orderApplication = new ProductApplication(new ProductInfrastructure(), new BrokerInfrastructure(new ProductInfrastructure()));

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

