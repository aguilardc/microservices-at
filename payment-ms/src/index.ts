import ServerBootstrap from "./bootstrap/server.bootstrap";
import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import app from "./app";

(async () => {
    try {
        const listPromises = [];

        const serverBootstrap = new ServerBootstrap(app);
        const brokerBootstrap = new BrokerBootstrap();

        listPromises.push(serverBootstrap.initialize());
        listPromises.push(brokerBootstrap.initialize());

        await Promise.all(listPromises);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()

