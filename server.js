import express from "express"
import cors from "cors"
import Bytez from "bytez.js"

const app = express()
app.use(cors())
app.use(express.json())

const sdk = new Bytez(process.env.BYTEZ_KEY)
const model = sdk.model("openai/gpt-4o")

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body

    const { error, output } = await model.run(messages)

    if (error) {
      return res.status(500).json({ error })
    }

    res.json({ reply: output })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.get("/", (req, res) => {
  res.send("Backend running")
})

app.listen(3000, () => {
  console.log("Backend running on port 3000")
})
