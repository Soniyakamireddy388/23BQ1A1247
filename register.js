const registrationUrl = "http://4.244.186.213/evaluation-service/register";

const payload = {
  email: "23bq1a1247@vvit.net", // Changed to match your institutional roll number email requirement
  name: "Soniya Kamireddy",
  mobileNo: "6300856899", 
  githubUsername: "Soniyakamireddy388",
  rollNo: "23BQ1A1247",
  accessCode: "xgAsNC"
};

async function registerMe() {
  try {
    const response = await fetch(registrationUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log("====== YOUR REGISTRATION RESULTS ======");
    console.log(JSON.stringify(data, null, 2));
    console.log("=======================================");
  } catch (err) {
    console.error("Registration failed:", err.message);
  }
}

registerMe();