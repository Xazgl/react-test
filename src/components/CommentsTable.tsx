import {useEffect} from "react";
import axios from "axios";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from "@mui/material";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { SelectTable } from "./SelectTable";
import { useCommentsContext } from "./Provider";
import { PaginationRow } from "./PaginationRow";


export function CommentsTable () {

  const { comments,setTotal, setComments,navigate , viewMode, page, 
  filter, useDeb } = useCommentsContext();  

  const debouncedFilter = useDeb(filter);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/commentsAll", {
          params: { page, limit: 10, filter },
        });
        setComments(response.data.comments);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchComments();
  }, [page,  debouncedFilter]);



  return (
    
    <section className="flex flex-col w-full  h-full p-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
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


