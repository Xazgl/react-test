import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";


type CommentsContextType = {
    comments: any[];
    setComments: React.Dispatch<React.SetStateAction<any[]>>;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    viewMode: string;
    setViewMode: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filter: string;
    handlePageChange  : (event: React.ChangeEvent<unknown>, value: number) => void;
    navigate:NavigateFunction;
    page:number;
    useDeb:(value: string) => string;
    error: string
  };
  

type CommentsProviderProps = {
  children: ReactNode;
};


const CommentsContext = createContext<CommentsContextType | undefined>(undefined);


export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [comments, setComments] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState("table");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const [error, setError] = useState('');

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ filter, page: value.toString() });
  };

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

  const validateInput = (value: string) => {
    const regex = /^[a-zA-Z0-9]*$/; // Допустимые символы (буквы и цифры)
    if (!regex.test(value)) {
      setError('Недопустимые символы');
    } else {
      setError('');
    }
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e.target.value);
    setSearchParams({ filter: e.target.value, page: "1" });
  };


  return (
    <CommentsContext.Provider
      value={{
        comments, setComments, total, setTotal, viewMode,
        setViewMode, filter, handleSearch, handlePageChange, navigate, page,
        useDeb,error
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};


export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error(`Ошибка хука`);
  }
  return context;
};
