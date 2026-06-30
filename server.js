require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Server is working 🚀");
});

// AI route
app.post("/ask", async (req, res) => {
    const question = req.body.question;
    const history = req.body.history || [];

    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                   "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful AI study assistant. Use previous conversation context to answer properly."
                        },
                        ...history,
                        {
                            role: "user",
                            content: question
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const answer = data?.choices?.[0]?.message?.content;

        if (!answer) {
            return res.json({
                answer: "No response from AI"
            });
        }

        res.json({ answer });

    } catch (error) {
        console.log(error);
        res.json({
            answer: "Server error 😢"
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
