import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import SellerSettingMain from './SellerSettingMain';
import SellerSettingProfit from './SellerSettingProfit';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Loading from './Loading';
import Message from './Message';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AdminNavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const productList = useSelector((state) => state.productList);
  const { loading, error, products: Products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;
  const sellerList = useSelector((state) => state.sellerList);
  const { sellers } = sellerList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successCreate) {
      console.log("success");
      navigate(`/items/update/${createdProduct.id}`);
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (successDelete) {
      dispatch(listProducts());
    }
    if (successUpdate) {
      dispatch(listProducts());
    }
  }, [dispatch, successCreate, successDelete, successUpdate]);

 
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    } else {
      redirect("/admin/productlist");
    }
  };

  const updateHandler = (id) => {
    navigate(`/items/update/${id}`);
  };

  const [value, setValue] = useState(0);
const userDeleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE SELLER
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="사용자 관리" {...a11yProps(0)} />
          <Tab label="판매자 관리" {...a11yProps(1)} />
          <Tab label="상품 관리" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div>
      <h1>Users</h1>
    
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
             
              <th>USER ID</th>
              
              <th>NAME</th>
              <th>EMAIL</th>
              <th>SELLER</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.is_seller ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {user.is_staff ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                
               
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={()=>userDeleteHandler(user.id)}>
                        <i className="fas fa-trash"></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div>
      <h1>Sellers</h1>
    
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SELLER ID</th>
              <th>USER ID</th>
              <th>BS NUMBER</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.user_id}</td>
                <td>{user.bs_number}</td>
                <td>{user.user}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={()=>userDeleteHandler(user.user_id)}>
                        <i className="fas fa-trash"></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
            <div>
              <Row className="align-items-center">
                <Col>
                  <h1>Products</h1>
                </Col>
               
              </Row>
              {loadingDelete && <Loading />}
              {errorDelete && <Message variant="danger">{errorDelete}</Message>}
              
              {errorCreate && <Message variant="danger">{errorCreate}</Message>}
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <div>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}₩</td>
                          {product.category_id === 1 ? (
                            <td>산책용품</td>
                          ) : product.category_id === 2 ? (
                            <td>간식</td>
                          ) : null}
                          <td>
                            <Button variant="light" className="btn-sm" onClick={() => updateHandler(product.id)}>
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product.id)}>
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
      </CustomTabPanel>
        </Box>
    
  );
}
 