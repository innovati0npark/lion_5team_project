import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Checkbox, Box } from '@mui/material';
import { Favorite, FavoriteBorder, Share, MoreVert } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#ff6d75',
  },
});

export default function BoardForm({ board }) {
  
  const [isLiked, setIsLiked] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const likeHandler = () => {
    setIsLiked(!isLiked);
  };
  const tagHandler = () => {  
    setShowTags(!showTags);
  }

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300" sx={{ height: 500 }}>
      <CardHeader
        avatar={
          <Link to={`/board/detail/${board.id}`}>
            {board.user_image ? (
              <Avatar src={VITE_API_BASE_URL+board.user_image} aria-label="user" />
            ) : (
              <Avatar sx={{ bgcolor: grey[500] }} aria-label="user">
                {board.username[0]}
              </Avatar>
            )}
          </Link>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={
          <Link to={`/board/detail/${board.id}`} className="no-underline text-black">
            {board.title}
          </Link>
        }
        subheader={new Date(board.created_at).toLocaleDateString()}
      />
      {/* <CardMedia
        component="img"
        // image={board.image_url}
        image={`${VITE_API_BASE_URL}${board.image_url}`}
        alt={board.title}
        className="object-cover"
        sx={{ height: 200 }}
      /> */}
       <div style={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="220"
                    image={`${VITE_API_BASE_URL}${board.image_url}`}
                    onClick={tagHandler }
                />
                {/* Tag */}
                {showTags ?  <div key={1} style={{ position: 'absolute', top: '100px', left: '40px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '5px 10px', borderRadius: '1000px' }}>
                  tag
                </div>: null}
            </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary" component="div">
          {board.content.length > 100 ? (
            <span dangerouslySetInnerHTML={{ __html: `${board.content.substring(0, 100)}...` }} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: board.content }} />
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likeHandler}>
          <StyledCheckbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={isLiked} />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
      <Box className="px-4 py-2">
        <Typography variant="caption" color="text.secondary">
          by{' '}
          <Link to={`/users/${board.user_id}`} className="text-blue-600 no-underline">
            {board.username}
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}