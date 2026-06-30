let chatHistory = [];
const chatBox = document.getElementById("response");
 button = document.getElementById("generate-btn");
const input = document.getElementById("question");
const response = document.getElementById("response");

if (!button || !input || !response) {
    console.error("Missing elements in HTML!");
}

button.addEventListener("click", async function () {

    const question = input.value.trim();
chatHistory.push({
    role: "user",
    content: question
});
    if (question === "") {
        response.textContent = "⚠️ Please enter a question.";
        return;
    }

    button.disabled = true;
    button.textContent = "🤖 Thinking...";

    response.textContent = "Sending to server...";
response.textContent = "🤖 Thinking...";
    const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    body: JSON.stringify({
    question: question,
    history: chatHistory
})
});
    const data = await res.json();
    chatHistory.push({
    role: "assistant",
    content: data.answer
});

chatBox.innerHTML += `
<div style="text-align:right; margin:10px;">
    <div style="display:inline-block; background:#dbeafe; padding:10px; border-radius:10px; max-width:70%;">
        ${question}
    </div>
</div>

<div style="text-align:left; margin:10px;">
    <div style="display:inline-block; background:#e5e7eb; padding:10px; border-radius:10px; max-width:70%;">
        ${data.answer}
    </div>
</div>
`;
chatBox.scrollTop = chatBox.scrollHeight;

    button.disabled = false;
    button.textContent = "✨ Generate Answer";
    input.value = "";
});

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        button.click();
    }
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function () {
        input.value = "Teach me " + card.textContent.replace(/📘|📐|⚛|🧬|🌍|📜/g, "").trim();
        input.focus();
    });
});
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// AI ROUTE (fake for now)
app.post("/ask", (req, res) => {
    const question = req.body.question;

    res.json({
        answer: "This is a backend response for: " + question
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
