import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Modal, Box, Chip, Stack } from "@mui/material";
import Message from "../components/Message";
import Loading from "../components/Loading";
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

function ProductCreateModal({ isOpen, onClose, createProduct}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(1);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error } = productCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
      image,
      category,
      description,
      tag: chipData,
    };
    dispatch(createProduct(product));
    onClose();
  };

  const [chipData, setChipData] = useState([]);
  const handleClick = (chipValue) => {
    if (chipData.includes(chipValue)) {
      setChipData((chipData) => chipData.filter((chip) => chip !== chipValue));
    } else {
      setChipData((chipData) => [...chipData, chipValue]);
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chipData) => chipData.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      
      <Box className="w-full max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <h1 className="text-2xl mb-4">Create Product</h1>
      <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <CloseIcon />
        </button>
        {loading && <Loading />}
        {error && <Message variant="danger">{error}</Message>}
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mb-4"
          />
          <Button
            variant="contained"
            component="label"
            className="mb-4"
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          {uploading && <Loading />}
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="1">산책용품</MenuItem>
              <MenuItem value="2">간식</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />
          <FormControl fullWidth variant="outlined" className="mb-4">
            <Stack direction="row" spacing={1}>
              <Chip
                label="목줄"
                onClick={() => handleClick("1")}
                onDelete={handleDelete("1")}
                deleteIcon={chipData.includes("1") ? <DeleteIcon /> : <DoneIcon />}
              />
              <Chip
                label="스텔라앤츄이스"
                onClick={() => handleClick("2")}
                onDelete={handleDelete("2")}
                deleteIcon={chipData.includes("2") ? <DeleteIcon /> : <DoneIcon />}
              />
              <Chip
                label="캐츠랑"
                onClick={() => handleClick("3")}
                onDelete={handleDelete("3")}
                deleteIcon={chipData.includes("3") ? <DeleteIcon /> : <DoneIcon />}
              />
            </Stack>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" className="w-full">
            Create
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ProductCreateModal;