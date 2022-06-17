import express from "express";
import { FeedbackController } from "../controller/FeedbackController";

export const feedbackRouter = express.Router();

//create feedback
const feedbackController = new FeedbackController();
feedbackRouter.post("/create", feedbackController.createFeedback);
