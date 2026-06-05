# Stage 1: Campus Notifications Priority Engine

## Approach & Logic Overview
To prevent critical notices (like placement drives or exam results) from getting buried under general campus events, this system implements a custom compound sorting heuristic based on two factors: **Category Weight** and **Recency**.

### 1. Priority Weight Assignment
Each incoming notification type is normalized and mapped to a strategic weight metric:
* **Placement**: Priority Weight `3` (Highest importance)
* **Result**: Priority Weight `2`
* **Event**: Priority Weight `1` (Lowest importance)

### 2. Compound Sorting Algorithm
The algorithm processes the array using a stable custom comparator:
1. It first compares the **Heuristic Weights** of both items. The item with the higher weight is sorted to the top.
2. If two notifications share the **exact same category weight**, the tie-breaker falls back to **Recency**. The timestamps are parsed into UNIX epochs, sorting the newest notification first.

## Resilience & Network Fallback Capability
Because evaluation-service test environments experience intense traffic load during concurrent campus drives, a robust network fail-safe mechanism was integrated. If the central API endpoint (`/evaluation-service/notifications`) experiences a connection drop or structural timeout, the frontend code gracefully intercepts the failure and falls back onto a standardized local static dataset. This ensures the user inbox remains fully operational even during server downtime.