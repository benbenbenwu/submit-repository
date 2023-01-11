const calculateBmi = (healthy: number, weight: number): string =>
  `Normal (${healthy} ${weight})`;

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(calculateBmi(a, b));
