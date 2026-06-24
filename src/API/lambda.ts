import serverlessExpress from "@vendia/serverless-express";
import { app } from "./Server";

export const handler = serverlessExpress({ app });
