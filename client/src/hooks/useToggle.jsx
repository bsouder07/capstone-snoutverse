import { useState } from "react";

const useToggle = (initialValue = false) =>{
    const [value, setValue] = useState(initialValue)

    const toggle = () => {
        setValue((prevValue) => !prevValue)
    }
    return [value,toggle]
}
export default useToggle

//This is a hook created to maintain between toggling between two states.