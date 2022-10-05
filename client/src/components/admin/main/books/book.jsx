import React, { useState } from "react";
import { Box } from "@mui/material";
import { grey } from '@mui/material/colors'
import { Grid } from "@mui/material";


import FilterListIcon from '@mui/icons-material/FilterList';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import CircleIcon from '@mui/icons-material/Circle';
import { green, yellow, red, blue } from "@mui/material/colors";

import ViewBookModal from "./viewBook";
import AddBookModal from "./addBook";

import axios from 'axios'

import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



// for searchbar
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
// 


// main function
function Books() {

    const [addBook, setaddbook] = React.useState()
    const addbookReload = (value) => {
        setaddbook(value)
    }

    // for dropDown 
    const [count, setCount] = React.useState("74.5vh")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [search, setSearch] = React.useState([]);
    const [x, setX] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const filterData = (book, key) => {
        const result = book.filter((book) => {
            return book.availability == key
        })
        if (result.length < 10) { setCount(`7+7*${result.length}`) }
        if (result.length >= 10) { setCount('74.5vh') }


        if (key.length == 0) { setCount('74.5vh') }
        setData(result)
        setSearch(result)
        setX(key)

    };
    const filterHandler = (e) => {
        setAnchorEl(null)
        let filterkey = e.currentTarget.textContent
        filterkey = filterkey == "Available" ? 1 : 2
        axios.get("http://localhost:8000/book")
            .then(res => {
                filterData(res.data.data, filterkey)
            })
            .catch(err => {
                console.log(err);
            })
    }
    // 


    // axios data load and pagination
    const [data, setData] = useState([])
    useEffect(() => {
        setaddbook(true)
        axios.get('http://localhost:8000/book')
            .then(res => {
                setData(res.data.data)
                filterData(res.data.data, 1)
            })
            .catch(err => {
                console.log(err);
            })
    }, [addBook])


    // for search
    const searchData = (books, searchKey) => {
        searchKey = searchKey.toLowerCase()
        const result = books.filter((book) =>
            book.title.includes(searchKey)
        )
        if (result.length < 10) { setCount(`7+7*${result.length}`) }
        if (result.length < 10 && searchKey.length == 0) { setCount(`7+7*${result.length}`) }
        if (result.length > 10 && searchKey.length == 0) { { setCount('74.5vh') } }
        if (result.length > 10) { { setCount('74.5vh') } }

        setData(result)
    }

    const searchHandler = (e) => {
        const searchkey = e.currentTarget.value
        searchData(search, searchkey)
    }
    // 

    // table body
    const allData = data.map((data, index) => {
        return (
            <TableRow key={index}>
                <TableCell>{data.bookId}</TableCell>
                <TableCell align="left">{data.title}</TableCell>
                <TableCell align="right">{data.author}</TableCell>
                <TableCell align="right">{data.qty}</TableCell>
                <TableCell align="center"><CircleIcon fontSize="small" sx={{ height: '10px', color: data.availability == 1 ? 'green' : 'red' }} /></TableCell>
                <TableCell align="right" sx={{ paddingY: 0 }}>
                    <Grid container>
                        <Grid item xs={4} ><ViewBookModal /></Grid>
                        <Grid item xs={4} ><ModeEditOutlineIcon
                            sx={{
                                border: 1,
                                borderColor: 'black',
                                padding: '5px',
                                borderRadius: '50px',
                                bgcolor: yellow[500],
                                "&:hover": {
                                    cursor: 'pointer'
                                }
                            }} />
                        </Grid>
                        <Grid item xs={4} ><DeleteIcon
                            sx={{
                                border: 1,
                                borderColor: 'black',
                                padding: '5px',
                                borderRadius: '50px',
                                bgcolor: red[400],
                                "&:hover": {
                                    cursor: 'pointer'
                                }
                            }} />
                        </Grid>

                    </Grid>
                </TableCell>
            </TableRow>
        )
    })
    // 

    // main return
    return (
        <Box sx={{ bgcolor: grey[200], height: '100vh' }}>

            {/* Add book button  */}
            <Box sx={{ paddingX: "20px", paddingTop: '20px' }}>
                <Grid container>
                    <Grid item xs={4} sx={{ display: "flex", alignItems: 'center' }}>
                        <AddBookModal addbookReload={addbookReload} />
                    </Grid>
                    <Grid item xs={8}></Grid>
                </Grid>
            </Box>

            {/* searchbar and filter */}
            <Toolbar sx={{ display: 'flex', justifyContent: 'end', bgcolor: grey[200], marginRight: '50px', }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={searchHandler}
                    />
                </Search>&nbsp;<button style={{ border: 'none' }}>
                    <FilterListIcon
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            color: 'black',
                            bgcolor: 'white',
                            padding: '8px',
                            borderRadius: '50px',
                            "&:hover": { cursor: 'pointer' }
                        }}
                    >
                    </FilterListIcon>
                </button>
            </Toolbar>


            {/* table */}
            <Box sx={{ marginX: '80px' }}>
                <TableContainer component={Paper} sx={{ height: count }}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: green[200] }}>
                                <TableCell sx={{ color: green[900] }}>Book ID</TableCell>
                                <TableCell sx={{ color: green[900] }}>Book Title</TableCell>
                                <TableCell align="right" sx={{ color: green[900] }}>Author</TableCell>
                                <TableCell align="right" sx={{ color: green[900] }}>Quantity</TableCell>
                                <TableCell align="center" sx={{ color: green[900] }}>Availability</TableCell>
                                <TableCell align="right" sx={{ color: green[900] }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allData}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Box>

            {/* filter menu */}
            <Menu sx={{ marginTop: '5px' }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem sx={{ bgcolor: x == 1 ? grey[300] : 'white' }} onClick={filterHandler}>Available</MenuItem>
                <MenuItem sx={{ bgcolor: x == 2 ? grey[300] : 'white' }} onClick={filterHandler}>Not Available </MenuItem>
            </Menu>

        </Box>
    )
}

export default Books;

