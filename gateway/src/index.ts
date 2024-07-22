import ServerBootstrap from "./bootstrap/server.bootstrap";
import app from "./app";


(async () => {
    try {
        const serverBootstrap = new ServerBootstrap(app);
        await serverBootstrap.initialize()
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()

