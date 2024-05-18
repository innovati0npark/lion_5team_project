import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { List, ListItem, ListItemText, TextField, Button, Box, Paper } from '@mui/material';
import { searchAxiosInstance } from '../api/axiosInstances';

function SearchBox() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();

  const fetchSuggestions = async (query) => {
    try {
      const response = await searchAxiosInstance.post(`search/?query=${query}`);
      
      setSuggestions(response.data.results);
    } catch (error) {
      // Handle error here
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/items/?query=${keyword}&?page=1`);
      setSuggestions([]);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <Box className="relative w-full max-w-md mx-auto">
      <form className="flex" onSubmit={submitHandler}>
        <TextField
          type="text"
          name="query"
          placeholder="Search"
          value={keyword}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          className="bg-white rounded-l-lg"
          InputProps={{
            style: { backgroundColor: 'white', color: 'gray' },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="ml-2 rounded-r-lg"
          sx={{ backgroundColor: '#f06292', color: 'white' }}
        >
          Search
        </Button>
      </form>
      {suggestions.length > 0 && (
        <Paper className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-10">
          <List>
            {suggestions.map((suggestion, index) => (
              <Link
                to={`/items/?query=${suggestion.page_content}&?page=1`}
                key={index}
                className="no-underline text-black"
                onClick={() => setSuggestions([])}
              >
                <ListItem button>
                  <ListItemText primary={suggestion.page_content} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default SearchBox;