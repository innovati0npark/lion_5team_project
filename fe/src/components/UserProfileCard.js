import React, {useEffect, useState } from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import Loading from './Loading';

import { getUserDetails } from '../actions/userActions';
function UserProfileCard() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [value, setValue] = useState(0);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;
    // useEffect(() => {
    //   if (!userInfo) {
    //     Navigate("/login");
    //   }
    //   if (!user) {
    //     dispatch(getUserDetails());
    //   }
    // }, [userInfo]);
    return (
      <Card className="ms-auto">
        <Row className="justify-content-center">
          <Col xs={6} md={4} className="d-flex flex-column justify-content-center align-items-center">
            {user.user&& user.user.image_url ? 
              <Image src={user.user.image_url} roundedCircle width="40%" />
              : <Image src="https://placehold.co/400" roundedCircle width="40%" />}
            {/* <Image src="https://placehold.co/400" roundedCircle width="40%" /> */}
            {userInfo&& userInfo.nickname !== "" ? 
            <h4 className='text-center'>{userInfo.nickname}</h4>
          : <h4 className='text-center'>{userInfo.username}</h4>}
            <h6>팔로워  {userInfo.follower  } |  팔로잉  {userInfo.following}</h6>
          </Col>
        </Row>
        <Card.Body className='text-center'>
          <Box sx={{ width: 500, margin: '0 auto' }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="스크랩북" icon={<BookmarkBorderIcon />} />
              <BottomNavigationAction label="좋아요" icon={<FavoriteBorderIcon />} />
              <BottomNavigationAction label="내 쿠폰" icon={<ConfirmationNumberOutlinedIcon />} />
            </BottomNavigation>
          </Box>
        </Card.Body>
      </Card>
    )
  }
export default UserProfileCard
