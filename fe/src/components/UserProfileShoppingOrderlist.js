import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "./Message";
import Loading from "./Loading";
import { useEffect } from "react";
import { Typography, Paper } from "@material-ui/core";

function UserProfileShoppingOrderlist({ orders }) {
  return (
    <Row>
      <Col md={9}>
        {/* <h2>My Orders</h2> */}

        {orders && orders.length === 0 ? (
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography variant="h6" align="center">
              You have no orders
            </Typography>
          </Paper>
        ) : (
        // <div style={{ display: 'flex', justifyContent: 'center' }}>

          <Table striped bordered hover responsive className="table-sm" style={{ textAlign: 'center' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID AT</th>
                <th>DELIVERED AT</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.created_at.substring(0, 10)}</td>
                    <td>{order.total_price}</td>
                    <td>
                      {order.paid_at ? (
                        order.paid_at.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.delivered_at ? (
                        order.delivered_at.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/detail/${order.id}`}>
                        <Button variant="light" className="btn-sm">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        // </div>
        )}
      </Col>
    </Row>
  );
}

export default UserProfileShoppingOrderlist;
