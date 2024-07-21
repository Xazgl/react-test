import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CommentsProviderProps } from "../../@types/dto";


const ViewModeContext = createContext<string>("table");
const SetViewModeContext = createContext<React.Dispatch<React.SetStateAction<string>>>(() => {});
const FilterContext = createContext<string>("");
const PageContext = createContext<number>(1);
const SetLoadingContext = createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => {});
const LoadingContext = createContext<boolean>(false);
const SetSearchParamsContext = createContext<React.Dispatch<React.SetStateAction<any>>>(() => {});

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [viewMode, setViewMode] = useState("table");
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const [loading, setLoading] = useState(false);

  return (

            <ViewModeContext.Provider value={viewMode}>
              <SetViewModeContext.Provider value={setViewMode}>
                <FilterContext.Provider value={filter}>
                  <PageContext.Provider value={page}>
                    <SetLoadingContext.Provider value={setLoading}>
                      <LoadingContext.Provider value={loading}>
                        <SetSearchParamsContext.Provider value={setSearchParams}>
                          {children}
                        </SetSearchParamsContext.Provider>
                      </LoadingContext.Provider>
                    </SetLoadingContext.Provider>
                  </PageContext.Provider>
                </FilterContext.Provider>
              </SetViewModeContext.Provider>
            </ViewModeContext.Provider>
  );
};


export const useViewMode = () => useContext(ViewModeContext);
export const useSetViewMode = () => useContext(SetViewModeContext);
export const useFilter = () => useContext(FilterContext);
export const usePage = () => useContext(PageContext);
export const useSetLoading = () => useContext(SetLoadingContext);
export const useLoading = () => useContext(LoadingContext);
export const useSetSearchParams = () => useContext(SetSearchParamsContext);











// import  { createContext, useContext, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { CommentsContextType, CommentsProviderProps } from "../../@types/dto";


// const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

// export const CommentsProvider = ({ children }: CommentsProviderProps) => {
//   const [comments, setComments] = useState<any[]>([]);
//   const [total, setTotal] = useState(0);
//   const [viewMode, setViewMode] = useState("table");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const filter = searchParams.get("filter") || "";
//   const page = parseInt(searchParams.get("page") || "1");
//   const [loading, setLoading] = useState(false)

//   // const setters = useMemo(() => ({setComments}), [setComments])

//   return (
//     <CommentsContext.Provider
//       value={{
//         comments, setComments, total, setTotal, viewMode,
//         setViewMode, filter,page,setLoading, loading, setSearchParams
//       }}
//     >
//       {children}
//     </CommentsContext.Provider>
//   );
// };


// export const useCommentsContext = () => {
//   const context = useContext(CommentsContext);
//   if (context === undefined) {
//     throw new Error(`Ошибка хука`);
//   }
//   return context;
// };
