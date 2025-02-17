import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import { mainAxiosInstance } from '../../api/axiosInstances';
import BoardDetailModal from '../../modals/BoardDetail';
import { getBoardDetails } from '../../store/actions/boardActions';
import useShow from '../../hook/useShow';
const MyBoard = ({ userId, url }) => {
  const [myBoards, setMyBoards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  const handleOpenModal = (id) => {
    setSelectedBoardId(id);
    dispatch(getBoardDetails(id));
    setModalOpen(true);
    
  }
  useShow(selectedBoardId);
  useEffect(() => {
    mainAxiosInstance.get(`/users/${userId}/board/`)
      .then(response => {
        if (!response.ok) {
        setMyBoards(response.data)
        }
      })
  }, [userId]);

  return (
    <Container className="py-8">
      <Typography variant="h4" className="mb-8 font-bold text-gray-800">
        나의 게시글
      </Typography>
      <BoardDetailModal open={modalOpen} handleClose={handleCloseModal} boardId={selectedBoardId} />
      <Grid container spacing={4}>
        {myBoards?.map((board) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={board.id}onClick={() => handleOpenModal(board.id)}>
            <Card className="h-full shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
             
                <CardMedia
                  component="img"
                  height="200"
                  image={url + board.image_url}
                  alt={board.title}
                  className="object-cover w-full"
                  
                />
              
              <CardContent>
               
                  <Typography variant="h6" className="font-bold text-gray-800 mb-2" noWrap>
                    {board.title.length > 20 ? `${board.title.substring(0, 20)}...` : board.title}
                  </Typography>
               
                <Typography variant="body2" className="text-gray-600">
                  {board.content.length > 30 ? `${board.content.substring(0, 30)}...` : board.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyBoard;