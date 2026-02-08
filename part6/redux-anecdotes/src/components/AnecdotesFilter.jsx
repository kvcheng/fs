import { useDispatch } from "react-redux"; 
import { changeFilter } from "../reducers/filterReducer";

const AnecdotesFilter = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <label>
                <input 
                    type="text"
                    name="filter"
                    onChange={(event) => dispatch(changeFilter(event.target.value))}
                />
            </label>
        </div>
    )
}

export default AnecdotesFilter