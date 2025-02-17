import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listQNA } from '../store/actions/qnaActions';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button, Container } from '@mui/material';

function QAScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qnaList = useSelector((state) => state.qnaList);
  const { qnas } = qnaList;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    dispatch(listQNA());
  }, [navigate, dispatch]);

  return (
    <Container maxWidth="lg" className="mx-auto py-8">
      <Box className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="font-bold text-pink-700">
          Q&A
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/qna/create')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Create Q&A
        </Button>
      </Box>
      <Grid container spacing={4}>
        {qnas.map((qna) => (
          <Grid item key={qna.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              {qna.image_url && (
                <Link to={`/qna/detail/${qna.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${VITE_API_BASE_URL}${qna.image_url}`}
                    alt={qna.title}
                    className="object-cover"
                  />
                </Link>
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <Link to={`/qna/detail/${qna.id}`} className="no-underline text-gray-900 hover:text-blue-600">
                    {qna.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  <span dangerouslySetInnerHTML={{ __html: qna.content }} className="text-gray-700" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default QAScreen;