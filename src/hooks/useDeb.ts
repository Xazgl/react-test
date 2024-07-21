import { useState, useEffect } from "react";

const useDeb = (value: string) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (initialRender) {
            setDebouncedValue(value);
            setInitialRender(false);
            return;
        }

        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [value, initialRender]);

    return debouncedValue;
};

export default useDeb;














// const useDeb = (value:string) => {
//     const [valueDeb,setValueDeb] = useState('')
//     useEffect(() => {
//             const time = setTimeout(()=>{
//                 setValueDeb(value)
//             },1000)

//             return() => clearTimeout(time)

//     }, [value])   
    
//     return valueDeb;  
// } 

// export default useDeb;

