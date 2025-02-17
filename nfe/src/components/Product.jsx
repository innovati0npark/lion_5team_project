import React from "react";
import { Link } from "react-router-dom";
import { CardMedia, Typography, Box, Card, CardContent } from "@mui/material";
import Rating from "./Rating";

function Product({ product, id }) {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col justify-between">
      <Link to={`/items/detail/${id}`}>
        <CardMedia
          component="img"
          className="object-cover w-full"
          image={`${VITE_API_BASE_URL}${product.image_url}`}
          alt={product.name}
          style={{ height: "250px" }} // Ensure image is not too tall
        />
      </Link>
      <CardContent className="p-4 flex flex-col justify-between flex-grow">
        <Link to={`/items/detail/${id}`}>
          <Typography
            variant="h6"
            noWrap
            className="w-full text-gray-800 font-semibold"
            title={product.name}
          >
            {product.name}
          </Typography>
        </Link>
        <Box className="flex flex-col items-start mt-2">
          <Box className="flex items-center space-x-2">
            <Rating value={product.rate} text={``} color={"#f8e825"} />
            <Typography variant="body2" className="text-gray-500">
              {product.rate} stars
            </Typography>
          </Box>
          <Typography variant="h6" className="mt-2 text-lg font-bold text-gray-800">
            {product.price}₩
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Product;