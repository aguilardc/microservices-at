import express, {Application, Request, Response} from "express";
import router from "./module/interfaces/http/router";
import {ErrorService} from "./services/errors.service";
import cors from "cors";

class App {
    readonly expressApp: Application;
    constructor() {
        this.expressApp = express();
        this.middlewares();
        this.mountRoutes();
        this.mountErrors();
    }

    middlewares() {
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({extended: true}));
        this.expressApp.use(cors());
    }

    mountRoutes() {
        this.expressApp.use("/api", router);
        this.expressApp.get('/', (req: Request, res: Response) => {
            res.send('Hello World!');
        });
    }

    mountErrors() {
        this.expressApp.use(ErrorService.notFound);
        this.expressApp.use(ErrorService.generic);
    }
}

export default new App().expressApp;