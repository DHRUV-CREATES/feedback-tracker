const form = document.getElementById("feedbackForm");
const list = document.getElementById("feedbackList");
let feedbacks = [];
let isAdmin = false; // default role

function setRole(role) {
  isAdmin = role === "admin";
  displayFeedbacks();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;

  const feedback = {
    user,
    title,
    desc,
    priority,
    status: "New",
    date: new Date().toLocaleString(),
  };

  feedbacks.push(feedback);
  displayFeedbacks();
  form.reset();
});

function updateStatus(index, newStatus) {
  feedbacks[index].status = newStatus;
  displayFeedbacks();
}

function displayDashboard() {
  let total = feedbacks.length;
  let newCount = feedbacks.filter(fb => fb.status === "New").length;
  let progressCount = feedbacks.filter(fb => fb.status === "In Progress").length;
  let doneCount = feedbacks.filter(fb => fb.status === "Done").length;

  document.getElementById("dashboardSummary").innerHTML = `
    <h3>📊 Dashboard Summary</h3>
    <p>Total: ${total} | 🆕 New: ${newCount} | ⚙️ In Progress: ${progressCount} | ✅ Done: ${doneCount}</p>
    <hr>
  `;
}

function displayFeedbacks() {
  list.innerHTML = "";
  displayDashboard();

  feedbacks.forEach((fb, index) => {
    const div = document.createElement("div");
    div.className = `feedback-item status-${fb.status.replace(" ", "")}`;
    div.innerHTML = `
      <h3>${fb.title}</h3>
      <p><strong>Submitted by:</strong> ${fb.user}</p>
      <p><strong>Description:</strong> ${fb.desc}</p>
      <p><strong>Priority:</strong> ${fb.priority}</p>
      <p><strong>Submitted on:</strong> ${fb.date}</p>
      ${
        isAdmin
          ? `
        <label for="status-${index}"><strong>Status:</strong></label>
        <select id="status-${index}" onchange="updateStatus(${index}, this.value)">
          <option ${fb.status === "New" ? "selected" : ""}>New</option>
          <option ${fb.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${fb.status === "Done" ? "selected" : ""}>Done</option>
        </select>
      `
          : `<p><strong>Status:</strong> ${fb.status}</p>`
      }
    `;
    list.appendChild(div);
  });
}
