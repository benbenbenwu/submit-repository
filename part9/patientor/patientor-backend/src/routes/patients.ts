import express from "express";
import {
  addNewPatient,
  findById,
  getAllPatients,
} from "../services/patientsService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = getAllPatients();
  console.log(result);
  res.status(200).send(result);
});

router.get("/:id", (req, res) => {
  const patient = findById(req.params.id);

  if (patient) {
    res.status(200).send(patient);
  } else {
    res.status(404).send("404");
  }
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addPatient = addNewPatient(newPatient);
    res.send(addPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
