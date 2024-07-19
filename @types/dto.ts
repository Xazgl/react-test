import { ReactNode } from "react";
import { NavigateFunction } from "react-router";

export type CommentsContextType = {
  comments: any[];
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  navigate: NavigateFunction;
  page: number;
};

export type CommentsProviderProps = {
  children: ReactNode;
};
