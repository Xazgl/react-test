import {useEffect, useMemo, useRef} from "react";
import axios from "axios";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from "@mui/material";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { SelectTable } from "./SelectTable";
import { PaginationRow } from "./PaginationRow";
import useDeb from "../hooks/useDeb";
import { useNavigate } from "react-router";
import { useFilter, usePage, useViewMode } from "./Provider";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsFailure, fetchCommentsStart, fetchCommentsSuccess } from "../slice/commentsSlice";
import { RootState } from "../store";
import { host } from "../config";
import { LoadingTable } from "./LoadingTable";


export function CommentsTable () {

  const viewMode =  useViewMode()
  const page = usePage()
  const filter = useFilter()
  const debouncedFilter = useDeb(filter);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchComments = async () => {
      dispatch(fetchCommentsStart()); 

      try {
        const response = await axios.get(`${host}/commentsAll`, {
          params: { page, limit: 10, debouncedFilter },
        });
        setTimeout(()=>{
         dispatch(fetchCommentsSuccess({ comments: response.data.comments, total: response.data.total }));
        }, 200 )
      } catch (error) {
        dispatch(fetchCommentsFailure('Ошибка при получении данных'));
      }
    };

    fetchComments();
  }, [dispatch, page, debouncedFilter]);

  const { comments, loading } = useSelector((state: RootState) => state.comments);


  return (
    <section className="flex flex-col w-full  h-full p-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-indigo-500  to-90% ">
      <SelectTable />

      {viewMode === "table" ? (
        <TableContainer
        sx={{
          border: 'solid 1px white',
          borderTopLeftRadius: 0, 
          borderTopRightRadius: 0,
          background: 'transparent',
          color: 'white',
          '& .MuiTableCell-root': {
            color: 'white',
          },
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { fontSize:'15px', fontWeight: "bold",backgroundColor: "rgba(255, 255, 255, 0.2)" } }}>
              <TableCell>ID</TableCell>
              <TableCell>Post</TableCell>
              <TableCell>Автор</TableCell>
              <TableCell>Почта</TableCell>
              <TableCell>Комментарий</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {loading === false &&
             <>
              {comments.map((comment: any) => (
              <TableRow
                key={comment.id}
                onClick={() => navigate(`/comment/${comment.id}`)}
                sx={{
                  cursor: 'pointer',
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    "& .MuiTableCell-root": {
                      color: 'black',
                      
                    },
                  },
                  transition: "all 0.7s",
                }}
              >
                <TableCell>{comment.id_comment}</TableCell>
                <TableCell>{comment.post_id}</TableCell>
                <TableCell>{comment.name}</TableCell>
                <TableCell>{comment.email}</TableCell>
                <TableCell>{comment.body}</TableCell>
              </TableRow>
              ))}
             </>
            }

            {loading ===  true &&
              <LoadingTable/>
            }

          </TableBody>
        </Table>
        <PaginationRow />
      </TableContainer>
      ) : (
        <>
          <JSONPretty data={comments}></JSONPretty>
          <PaginationRow />
        </>
      )}
    </section>
  );
};


