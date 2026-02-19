import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight) {
        return res.status(400).send('malformatted parameters');
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send(bmi);
});

app.get('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    
    if (!body) {
        return res.status(400).send('parameters missing');
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        return res.status(400).send('parameters missing');
    }
    if (!Array.isArray(daily_exercises) || daily_exercises.some(h => typeof h !== 'number') || isNaN(Number(target))) {
        return res.status(400).send('malformatted parameters');
    }

    const result = calculateExercise(daily_exercises as number[], Number(target));
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});