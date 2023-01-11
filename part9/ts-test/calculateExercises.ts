interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseTimeArray: Array<number>,
  target: number
): Result => {
  if (typeof exerciseTimeArray !== "object" || typeof target !== "number") {
    throw new Error("parameters missing");
  }
  const average =
    exerciseTimeArray.reduce((a, b) => a + b) / exerciseTimeArray.length;
  const trainingDays = exerciseTimeArray.filter((e) => e > 0).length;
  const success = average < target ? false : true;
  const rating = average < target ? 2 : 3;
  const ratingDescription =
    average < target
      ? average * 2 < target
        ? "bad"
        : "not too bad but could be better"
      : "good";

  return {
    periodLength: exerciseTimeArray.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/* const target: number = Number(process.argv[process.argv.length - 1]);
const timeArray = process.argv.slice(2, -1).map((n) => Number(n));

console.log(calculateExercises(timeArray, target)); */
