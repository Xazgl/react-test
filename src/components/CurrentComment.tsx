import axios from "axios";
import { Typography, CardContent, Card, Button, CardHeader, IconButton, Avatar } from "@mui/material";
import { useParams } from "react-router";
import { useCommentsContext } from "./Provider";
import { useEffect, useState } from "react";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import ShareIcon from '@mui/icons-material/Share';

export function CurrentComment() {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState<any>(null);

  const { navigate } = useCommentsContext();

  useEffect(() => {
    const fetchComment = async () => {
      const response = await axios.get(`http://localhost:5000/comments/${id}`);
      setComment(response.data);
    };

    fetchComment();
  }, [id]);

  if (!comment) return <div>Loading...</div>;

  const handleBackClick = () => {
    navigate({
      pathname: "/",
      search: `?${URLSearchParams.toString()}`,
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };
 
  return (

    <section className="flex flex-col justify-center items-center  w-full h-[100vh] p-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90">
      <div className="flex flex-col w-full mt-[5px] items-start">
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5 ,  backgroundColor: "rgba(255, 255, 255, 0.3)"}}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings"  onClick={handleCopyLink}>
            <ShareIcon />
          </IconButton>
        }
        title={`Комментарий ID:${comment.id_comment}`}
    
      />
     
      <CardContent sx={{display:'flex', flexDirection:'column',gap:'5px'}}>
        <Typography variant="body1">Post ID: {comment.post_id}</Typography>
        <Typography variant="body1">Автор: {comment.name}</Typography>
        <Typography variant="body1">Почта: {comment.email}</Typography>
        <Typography variant="body1">Текст: {comment.body}</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            transition: "all 0.5s",
            backgroundColor: '#55529fbd',
            '&:hover': {
              backgroundColor: '#55529f',
            },
            '&:focus': {
              backgroundColor: '#55529fda',
            },
            '&:active': {
              backgroundColor: '#54529F',
            },
          }}
          onClick={handleBackClick}
          startIcon={<ReplyAllIcon sx={{ fontSize: '15px' }} />}
        >
          Назад
        </Button>
      </CardContent>
    </Card>
      </div>
    </section>
  );
}
