import * as http from "http";
import IBootstrap from "./IBootstrap";
import EnvironmentVariables from "../services/app.service";
import {Application} from "express";

export default class ServerBootstrap implements IBootstrap {

    constructor(private readonly app: Application) {
    }

    initialize(): Promise<boolean | Error> {
        return new Promise<boolean | Error>((resolve, reject) => {
            const server = http.createServer(this.app);

            const PORT = EnvironmentVariables.PORT;

            server
                .listen(PORT)
                .on("listening", () => {
                    resolve(true);
                    console.log(`Server is running on port ${PORT}`)
                })
                .on("error", (err: Error) => {
                    reject(err)
                    console.log(err)
                })
        });
    }
}