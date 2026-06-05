export async function submitLog(stack, level, pkg, message) {
  const logUrl = "http://4.244.186.213/evaluation-service/logs";
  const authToken = "YOUR_ACTUAL_BEARER_TOKEN"; 

  if (authToken === "YOUR_ACTUAL_BEARER_TOKEN") {
    console.log(`[Local Log Bypass]: ${message}`);
    return;
  }

  const logPayload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message: message
  };

  try {
    const response = await fetch(logUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify(logPayload)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`[Log Server Feedback]: ${data.message || 'Log captured successfully'}`);
    } else {
      console.error(`[Log Error State]: Received status code ${response.status}`);
    }
  } catch (err) {
    console.log(`[Log Local Fallback]: ${message} (Server unreachable: ${err.message})`);
  }
}