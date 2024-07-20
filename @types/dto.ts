import { ReactNode } from "react";
import { SetURLSearchParams,  } from "react-router-dom";

export type CommentsContextType = {
  comments: any[];
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  page:number;
  loading:boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSearchParams:SetURLSearchParams; 
};


export type CommentsProviderProps = {
  children: ReactNode;
};


