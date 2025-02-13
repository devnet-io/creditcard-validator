import express, { Request, Response } from "express";
import cors from "cors";
import serverless from "serverless-http";
import {validateCreditCard} from "./validation/cardValidator";
import { ICreditCard } from "./validation/validationContext";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    // TODO actual security policy
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.post("/api/validateCreditCard", (req: Request, res: Response) => {
   // TODO validate input
    const card: ICreditCard = req.body;

    // perform the card validation
    const validationResults = validateCreditCard(card);

    res.json(validationResults);
});

export const devServer = app;
export const handler = serverless(app);
