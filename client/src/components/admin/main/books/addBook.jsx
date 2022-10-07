import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Button } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { green, yellow, red, blue, grey } from "@mui/material/colors";

import axios from 'axios'

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px',
    boxShadow: 24,
    p: 4,
};


function AddBookModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [bookid, setBookid] = React.useState()
    const [booktitle, setBooktitle] = React.useState()
    const [bookauthor, setBookauthor] = React.useState()
    const [bookcategory, setBookcategory] = React.useState()
    const [booklanguage, setBooklanguage] = React.useState()
    const [bookqty, setBookqty] = React.useState()

    const [fileInput, setfileinput] = React.useState()
    const [prevImg, setprevimg] = React.useState()
    const [img, setimg] = React.useState()

    const formHandler = (e) => {
        e.target.name == 'bookId' ? setBookid(e.target.value)
            : e.target.name == 'title' ? setBooktitle(e.target.value)
                : e.target.name == 'category' ? setBookcategory(e.target.value)
                    : e.target.name == 'qty' ? setBookqty(e.target.value)
                        : e.target.name == 'language' ? setBooklanguage(e.target.value)
                            : setBookauthor(e.target.value)

    }

    const imgHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setprevimg(reader.result)
            setimg(reader.result)
    }
    }

    const submitHandler = () => {
        let data = {
            bookId: bookid,
            title: booktitle,
            author: bookauthor,
            language: booklanguage,
            category: bookcategory,
            qty: bookqty,
            img:img
        }
        axios.post('http://localhost:8000/book', data)
            .then((response) => {
                if (response.data.success) {
                    setOpen(false)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        props.addbookReload(false)
    }

    return (
        <div>
            <Button
                sx={{
                    bgcolor: green[200],
                    padding: "10px",
                    height: '50px',
                    border: 1,
                    borderColor:
                        green[900],
                    color: green[900],
                    "&:hover": { bgcolor: green[100] }
                }} onClick={handleOpen}>
                &nbsp;&nbsp;&nbsp;<LibraryAddIcon />&nbsp;&nbsp;&nbsp;
                Add Book&nbsp;&nbsp;&nbsp;
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{ padding: '20px', borderRadius: '4px' }}>
                        <Typography
                            variant='h4'
                            sx={{ paddingBottom: '10px', color: green[900] }}>
                            Add Book
                        </Typography>

                        <TextField
                            name='bookId'
                            sx={{ paddingBottom: '10px' }}
                            color="success"
                            helperText="Enter ID of the Book"
                            fullWidth
                            id="filled-basic"
                            label="Book ID"
                            variant="filled"
                            onChange={formHandler} />

                        <TextField
                            name='title'
                            sx={{ paddingBottom: '10px' }}
                            color="success"
                            helperText="Enter Name of the Book"
                            fullWidth
                            id="filled-basic"
                            label="Book Title"
                            variant="filled"
                            onChange={formHandler} />

                        <TextField
                            name='author'
                            sx={{ paddingBottom: '10px' }}
                            color="success"
                            helperText="Enter Author of the Book"
                            fullWidth
                            id="filled-basic"
                            label="Book Author"
                            variant="filled"
                            onChange={formHandler} />

                        <TextField
                            name='category'
                            sx={{ paddingBottom: '10px' }}
                            color="success"
                            helperText="Enter Category of the Book"
                            fullWidth
                            id="filled-basic"
                            label="Book Category"
                            variant="filled"
                            onChange={formHandler} />

                        <Grid container>
                            <Grid item xs={5}>
                                <TextField
                                    name='language'
                                    sx={{ paddingBottom: '10px' }}
                                    color="success"
                                    helperText="Enter Language of the Book"
                                    fullWidth id="filled-basic"
                                    label="Book Language"
                                    variant="filled"
                                    onChange={formHandler} />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={6}>
                                <TextField
                                    name='qty'
                                    sx={{ paddingBottom: '10px' }}
                                    color="success"
                                    helperText="Enter Author of the Book"
                                    fullWidth
                                    id="filled-basic"
                                    label="Book Quantity"
                                    variant="filled"
                                    onChange={formHandler} />
                            </Grid>
                            <input onChange={imgHandler} type="file" name="img" id="" style={{ backgroundColor: grey[200], padding: '10px' }} />
                        </Grid>
                        {prevImg && <img src={prevImg} alt="chosen" style={{height:'100px',marginTop:'5px',marginBottom:'10px'}}/>}
                        <br />
                        <Button
                            variant='contained'
                            onClick={submitHandler}
                            sx={{
                                bgcolor: green[300],
                                border: 1,
                                borderColor: green[900],
                                color: green[900],
                                "&:hover": { bgcolor: green[200] }
                            }}> <SendIcon /> &nbsp; Submit
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}

export default AddBookModal;