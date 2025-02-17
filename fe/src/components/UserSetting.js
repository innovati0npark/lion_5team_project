import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Image,
  Container,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { updateUserProfile } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

function UserSetting({userInfo, user}) {
  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  const [message, setMessage] = useState("");
  const nicknameRef = useRef();
  const emailRef = useRef();
  

  useEffect(() => {
    if (success) {
      alert('수정이 완료되었습니다.');
      window.location.reload();
    }
  }, [success]);

  const handleImageChange = async(e) => {
    console.log("handleImageChange activated")

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image_url", image);

    try {
      const response = await fetch("/users/updateImage/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Image uploaded successfully");
        dispatch(getUserDetails(userInfo.id));
      } else {
        console.log ("imageupload",data.message)
        setMessage(data.message);
      
      }
    } catch (error) {
      console.error(error.message);
      setMessage(error.message);
      
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        nickname: nicknameRef.current.value,
        email: emailRef.current.value,
      })
    );
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6} md={4}>
          <label htmlFor="fileInput">
            
            {user.user&& user.user.image_url ? 
              <Image src={user.user.image_url} roundedCircle width="40%" />
              : <Image src="https://placehold.co/400" roundedCircle width="40%" />}
          </label>
          <Form.Control
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            style={{
              display: "none",
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                닉네임 <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder={user.user&&user.user.nickname  }
                ref={nicknameRef}
                
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                Email Address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder={user.user&&user.user.email}
                ref={emailRef}
              ></Form.Control>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" size="lg">
                Update
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserSetting;