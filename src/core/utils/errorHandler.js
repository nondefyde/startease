import { Logger } from "./logger.js";
import { ENVIRONMENT } from "./environment.js";

export class ErrorHandler {
  constructor() {
    this.logger = new Logger();
  }

  handleError(error) {
    if (ENVIRONMENT.ENV === "development") {
      this.handleDevError(error);
    } else {
      this.handleProdError();
    }
  }

  handleDevError(error) {
    this.logger.error("Error Occurred : ", error);
    throw error;
  }

  handleProdError() {
    this.logger.error(`Something went wrong. Please try again later.`);
  }
}

export const errorHandler = new ErrorHandler();
