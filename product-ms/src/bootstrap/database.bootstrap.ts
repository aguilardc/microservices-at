import IBootstrap from "./IBootstrap";
import mongoose from "mongoose";
import EnvironmentVariables from "../services/app.service";

export default class DatabaseBootstrap implements IBootstrap {
    initialize(): Promise<boolean | Error> {
        return new Promise<boolean | Error>((resolve, reject) => {
            const username = EnvironmentVariables.MONGO_USERNAME;
            const password = EnvironmentVariables.MONGO_PASSWORD;
            const host = EnvironmentVariables.MONGO_HOST;
            const port = EnvironmentVariables.MONGO_PORT;
            const database = "product";
            const authSource = "admin";

            const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}&retryWrites=true&w=majority`;

            const options = {
                minPoolSize: 5,
                maxPoolSize: 10,
            };

            mongoose.connect(connectionString, options)
                .then(() => {
                    console.log("Connected to MongoDB");
                    resolve(true);
                })
                .catch((error: Error) => reject(error));
        });
    }
}