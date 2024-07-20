import { Pagination, PaginationItem } from "@mui/material";
import { useFilter, usePage, useSetSearchParams} from "./Provider";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function PaginationRow() {
  const { total } = useSelector((state: RootState) => state.comments)
  const setSearchParams = useSetSearchParams()
  const page = usePage()
  const filter = useFilter()


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ filter, page: value.toString() });
  };


  return (
    <div className="flex w-full  justify-center p-1">
      <Pagination
        count={Math.ceil(total / 10)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              display:
                item.type === "start-ellipsis" || item.type === "end-ellipsis"
                  ? "none"
                  : "block",
              transition: "all 1s",
              "&:hover": {
                backgroundColor: "#811515",
                color: "white",
                opacity: 1,
              },
              "&.Mui-selected": {
                backgroundColor: "#55529fbd",
                color: "white",
              },
              "&:not(.Mui-selected):not(:hover)": {
                backgroundColor: "black",
                color: "white",
                opacity: 1,
              },
              "@media (max-width: 540px)": {
                minWidth: "28px",
                height: "28px",
                fontSize: "0.75rem",
                marginTop: "10px",
              },
              "@media (max-width: 420px)": {
                minWidth: "25px",
                height: "25px",
                fontSize: "0.70rem",
              },
              "@media (max-width: 370px)": {
                minWidth: "20px",
                height: "20px",
              },
            }}
          />
        )}
      />
    </div>
  );
}
