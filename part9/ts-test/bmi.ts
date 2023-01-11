interface BmiResult {
  height: number;
  weight: number;
  bmi: String;
}

export const bmi = (height: number, weight: number): BmiResult => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("malformatted parameters");
  } else {
    return {
      height,
      weight,
      bmi: `Normal (${height} ${weight})`,
    };
  }
};
