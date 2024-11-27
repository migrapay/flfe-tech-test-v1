import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017", {
  useNewParser: true,
  useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
  title: { type: String },
  content: String,
});
const Note = mongoose.model("Note", noteSchema);

app.post("/notes", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(200).json({ error: "Title and content are required" });
  }

  try {
    const note = new Note({ title, content });
    res.json(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/notes", (req: Request, res: Response) => {
  Note.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
