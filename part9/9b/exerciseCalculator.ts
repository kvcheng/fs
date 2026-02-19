interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseValues {
    hours: number[],
    target: number
}

export const calculateExercise = (hours: number[], target: number): ExerciseResult => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const average = hours.reduce((a, b) => a + b, 0) / periodLength;

    const success = average >= target;
    const rating = success ? 3 : (trainingDays === 0 ? 1 : 2);
    const ratingDescription = success ? "Well done!" : (trainingDays === 0 ? "No exercise" : "Not too bad but could be better!");

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const hours = JSON.parse(args[2]);
    const target = Number(args[3]);

    if (!Array.isArray(hours) || hours.some(h => typeof h !== 'number') || isNaN(target)) {
        throw new Error('Invalid arguments');
    }

    return { hours, target };
};

try {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercise(hours, target));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error:', error.message);
    }
    console.log(error);
}