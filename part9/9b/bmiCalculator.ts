interface BmiValues {
    height: number,
    weight: number
}

interface BmiReturn {
    weight: number,
    height: number,
    bmi: string
}

export const calculateBmi = (height: number, weight: number): BmiReturn => {
    const bmi = weight / (height/100 * height/100);
    let category: string;
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi < 25) {
        category = "Normal weight";
    } else if (bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }

    return {
        weight,
        height,
        bmi: category
    };
};

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const height = Number(args[2]);
    const weight = Number(args[3]);

    if (isNaN(height) || isNaN(weight)) throw new Error('Invalid arguments');

    return { height, weight };
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error:', error.message);
    }
    console.log(error);
}