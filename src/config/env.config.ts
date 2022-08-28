import { env } from "process";

export const EnvConfiguration = () => ({

    enviroment : env.NODE_ENV || 'dev',
    mongodb    : env.MONGO_DB,
    port       : env.PORT || 3000,

});