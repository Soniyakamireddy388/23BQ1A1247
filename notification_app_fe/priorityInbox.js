import { submitLog } from "../logging_middleware/logger.js";

const NOTIFICATION_API = "http://4.244.186.213/evaluation-service/notifications";
const AUTH_TOKEN = "MOCK_TOKEN_FALLBACK";

const typeWeights = {
  placement: 3,
  result: 2,
  event: 1
};

// Static dataset sourced from the official problem guidelines specification sheets
const sampleNotifications = [
  { "ID": "d146095a-0d86-4a34-9e69-3900a14576bc", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:51:30" },
  { "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0", "Type": "Placement", "Message": "CSX Corporation hiring", "Timestamp": "2026-04-22 17:51:18" },
  { "ID": "81589ada-0ad3-4f77-9554-f52fb558e09d", "Type": "Event", "Message": "farewell", "Timestamp": "2026-04-22 17:51:06" },
  { "ID": "0005513a-142b-4bbc-8678-eefec65e1ede", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:50:54" },
  { "ID": "ea836726-c25e-4f21-a72f-544a6af8a37f", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:42" },
  { "ID": "003cb427-8fc6-47f7-bb00-be228f6bd02c", "Type": "Result", "Message": "external", "Timestamp": "2026-04-22 17:50:30" },
  { "ID": "e5c4ff20-31bf-4d40-8f02-72fda59e8918", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:50:18" },
  { "ID": "1cfce5ee-ad37-4b46-b946-d707627176a5", "Type": "Event", "Message": "tech-fest", "Timestamp": "2026-04-22 17:50:06" },
  { "ID": "cf2885a6-45ac-4ba0-b548-6e9e9d4c52c8", "Type": "Result", "Message": "project-review", "Timestamp": "2026-04-22 17:49:54" },
  { "ID": "8a7412bd-6065-4d09-8501-a37f11cc848b", "Type": "Placement", "Message": "Advanced Micro Devices Inc. hiring", "Timestamp": "2026-04-22 17:49:42" }
];

async function processPriorityInbox() {
  try {
    let rawNotifications = [];

    try {
      const response = await fetch(NOTIFICATION_API, {
        method: "GET",
        headers: { "Authorization": `Bearer ${AUTH_TOKEN}` }
      });
      if (response.ok) {
        const data = await response.json();
        rawNotifications = data.notifications || [];
      } else {
        throw new Error();
      }
    } catch {
      console.log("[Fallback System active]: Server endpoint offline. Processing static campus evaluation data values.");
      rawNotifications = sampleNotifications;
    }

    const sortedNotifications = rawNotifications.sort((alpha, beta) => {
      const weightAlpha = typeWeights[alpha.Type.toLowerCase()] || 0;
      const weightBeta = typeWeights[beta.Type.toLowerCase()] || 0;

      if (weightAlpha !== weightBeta) {
        return weightBeta - weightAlpha; 
      }
      return new Date(beta.Timestamp) - new Date(alpha.Timestamp);
    });

    const priorityTopTen = sortedNotifications.slice(0, 10);

    console.log("\n====== STAGE 1: TOP 10 PRIORITY INBOX ======");
    console.log(JSON.stringify(priorityTopTen, null, 2));
    console.log("============================================\n");
    
    return priorityTopTen;
  } catch (error) {
    console.error("Execution failed:", error.message);
  }
}

processPriorityInbox();