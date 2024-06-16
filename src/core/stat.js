import { isConnectedToInternet } from "./utils/helper.js";
import { axiosInstance } from "./utils/axios.js";
import { CLI_CONSTANTS } from "./utils/constant.js";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { ENVIRONMENT } from "./utils/environment.js";

// Get the current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the file where queued statistics will be stored
const QUEUE_FILE_PATH = path.resolve(__dirname, "queued_stat.json");

/**
 * Sends statistics to the server. If the device is not connected to the internet,
 * it saves the statistics locally to be sent later.
 *
 * @param {string} app - The name of the application (default is "startease").
 * @param {string} framework - The framework being used.
 */
export const sendStat = async (app = "startease", framework) => {
  if (ENVIRONMENT.ENV === "development") return;

  try {
    if (await isConnectedToInternet()) {
      return await axiosInstance(CLI_CONSTANTS.statBaseUrl).post("/stat", {
        app,
        framework,
      });
    } else {
      await saveStatToLocal({
        app,
        framework,
      });
    }
  } catch (error) {
    // TODO: send error log to server
  }
};

/**
 * Saves statistics data to a local file for later processing.
 *
 * @param {Object} data - The statistics data to be saved.
 */
const saveStatToLocal = async (data) => {
  try {
    // Check if the queue file exists
    const queueFileExist = fs.existsSync(QUEUE_FILE_PATH);
    let existingData;

    if (queueFileExist) {
      // Read existing data from the queue file
      existingData = await fs.readFile(QUEUE_FILE_PATH, "utf-8");
    }

    // Parse the existing data as JSON
    const parsedExistingData = JSON.parse(existingData || "[]");

    parsedExistingData.push(data);

    // Write the updated data to the queue file
    await fs.writeFile(QUEUE_FILE_PATH, JSON.stringify(parsedExistingData));
  } catch (error) {
    // TODO: send error log to server
  }
};

/**
 * Sends all queued statistics to the server. If sending fails, the statistics
 * remain in the queue file for future attempts.
 */
export const sendQueuedStats = async () => {
  try {
    const queueFileExist = fs.existsSync(QUEUE_FILE_PATH);

    if (!queueFileExist) {
      return;
    }

    const existingData = await fs.readFile(QUEUE_FILE_PATH, "utf-8");
    const parsedExistingData = JSON.parse(existingData || "[]");

    const failed = [];

    for (const data of parsedExistingData) {
      const { app, framework } = data;
      const result = await sendStat(app, framework);

      if (!result?.data?.success) {
        failed.push(data);
      }

      // Replace the queue file with the failed data
      await fs.writeFile(QUEUE_FILE_PATH, JSON.stringify(failed));
    }
  } catch (error) {
    // TODO: send error log to server
  }
};
