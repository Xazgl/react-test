import { useState, useEffect } from "react";

const useDeb = (value:string) => {
    const [valueDeb,setValueDeb] = useState('')
    useEffect(() => {
            const time = setTimeout(()=>{
                setValueDeb(value)
            },1000)

            return() => clearTimeout(time)

    }, [value])   
    
    return valueDeb;  
} 

export default useDeb;