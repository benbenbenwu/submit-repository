import express from "express";
import { bmi } from "./bmi";
import { calculateExercises } from "./calculateExercises";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;
    const result = bmi(Number(height), Number(weight));
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = req.body;
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
  } catch (error) {
    res.send(error.message);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
