import express from "express";
import { video } from "../controllers/globalController";

const videoRouter = express.Router();

videoRouter.get("/video", video);

export default videoRouter;