import type { CoursePart } from "../types/types";
import Part from "./Part";

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(part => (
        <div key={part.name}>
            <h3>{part.name} {part.exerciseCount}</h3>
            <Part {...part} />
        </div>
        ))}
    </div>
  );
}

export default Content;