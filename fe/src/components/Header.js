import React, {useState} from "react";
import {  Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import SearchBox from "./SearchBox";
import {Card, MenuItem, Menu, IconButton, Avatar} from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] =useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    dispatch({ type: "BOOKMARK_LIST_RESET" });
    dispatch({ type: "CART_LIST_RESET" });

  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar>
      <Container fluid>
        <div style={{ display: 'flex', alignItems: 'center'}}>
        {/* <Navbar.Brand href="/">PetPals</Navbar.Brand> */}
        <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>PetPals</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">
            <div style={{ display: 'flex', alignItems:'center' }}>
            <i class="fa-solid fa-paw" style={{ marginRight: '3px' }}></i>
            <span>Home</span>
            </div>
          </Nav.Link>
          <Nav.Link href="/items">
          <div style={{ display: 'flex', alignItems:'center' }}>
            <i class="fa-solid fa-dog" style={{ marginRight: '3px' }}></i>
            <span>Products</span>
            </div>
          </Nav.Link>
          <Nav.Link href="/board">
          <div style={{ display: 'flex', alignItems:'center' }}>
          <i class="fa-regular fa-clipboard" style={{ marginRight: '3px' }}></i>
            <span>Board</span>
            </div>
          </Nav.Link>
          <Nav.Link href="/qna">
          <div style={{ display: 'flex', alignItems:'center' }}>
          <i class="fa-solid fa-comments" style={{ marginRight: '3px' }}></i>
            <span>Q&A</span>
            </div>
          </Nav.Link>
        </Nav>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <SearchBox />

        </div>
        {userInfo? (
        <IconButton
          size="large"
          aria-label="show cart items"
          color="inherit"
        >
          <Link to="/cart">
            <i class="fa-solid fa-cart-shopping fa-xs"></i>
          </Link>
        </IconButton>):null}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
             {userInfo ? (
           <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {userInfo.image_url&& userInfo.name ? (
                  <Avatar src={userInfo.image_url} />
                ) : (
                  <Avatar>{userInfo.name}</Avatar>
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/users/profile">Profile</Link>
                  </MenuItem>
                <MenuItem onClick={logoutHandler}>
                    Logout
                  </MenuItem>
              </Menu>
            </div>
            ) : (
            <Card className="ms-auto me-3 bg-info">
              <LinkContainer to="/login">
                <Nav.Link>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '8px 15px' }}>
                  <i className="fas fa-user"></i>
                  <span>Login</span>
                  </div>
                </Nav.Link>
              </LinkContainer>
            </Card>
          )}
        
          {userInfo? (
          <Card className="ms-auto me-2 bg-info">
          <Nav className="ms-auto me-2">
            <NavDropdown title="글쓰기" id="navbarScrollingDropdown" drop='left'>
              <NavDropdown.Item href="/board/create/">
                <i class="fa-regular fa-image"></i>PET 사진/영상올리기
              </NavDropdown.Item>
              <NavDropdown.Item href="/qna/create/">
                Q&A 글쓰기
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown.Divider />
          </Nav>
        </Card>): null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
