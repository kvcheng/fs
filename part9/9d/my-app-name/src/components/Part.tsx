import type { CoursePart } from "../types/types";

const Part = (props: CoursePart) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    }
    switch (props.kind) {
        case "basic":
            return <div><p>{props.description}</p></div>
        case "group":
            return <div><p>Project exercises {props.groupProjectCount}</p></div>
        case "background":
            return <div><p>{props.description}</p><p>Background material: {props.backgroundMaterial}</p></div>
        default:
            return assertNever(props);
    } 
};

export default Part;