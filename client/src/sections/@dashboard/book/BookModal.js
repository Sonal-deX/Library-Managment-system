import * as React from 'react';
import { Grid, TextField, createTheme, ThemeProvider, Card, Container, colors } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import { maxWidth } from '@mui/system';
import axios from 'axios';



const theme = createTheme({
    palette: {
        primary: {
            main: green[600],
        },
        secondary: {
            main: '#edf2ff',
        },
    },
});


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: '#F9FAFB',
    boxShadow: 24,
    p: 3,

};

export default function TransitionsModal(props) {

    const [duplicateKeyError, setDuplicateKeyError] = React.useState();
    const [field, setField] = React.useState();

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
        e.target.name === 'bookId' ? setBookid(e.target.value)
            : e.target.name === 'title' ? setBooktitle(e.target.value)
                : e.target.name === 'category' ? setBookcategory(e.target.value)
                    : e.target.name === 'qty' ? setBookqty(e.target.value)
                        : e.target.name === 'language' ? setBooklanguage(e.target.value)
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
            img: [img,'null']
        }
        axios.post('http://localhost:8000/book', data)
            .then((response) => {
                if (response.data.success) {
                    setOpen(false)
                    props.bookReload(false)
                }
            })
            .catch((error) => {
                console.log(error);

            })
    }

    return (
        <div>
            <Button variant="contained" sx={{ bgcolor: green[600], ":hover": { bgcolor: green[700] } }} startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>New Book</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

            >

                <Box sx={{ display: 'flex', position: 'absolute', maxWidth: '555px', margin: '20px', paddingX: '5px', bgcolor: 0, overflow: 'auto' }}>
                    <Box sx={{ bgcolor: 'white', padding: '20px', borderRadius: '16px' }}>
                        <ThemeProvider theme={theme}>
                            <Typography
                                variant='h4'
                                sx={{ paddingBottom: '10px', color: green[600] }}>
                                Add Book
                            </Typography>

                            <TextField
                                name='bookId'
                                sx={{ paddingBottom: duplicateKeyError ? '' : '10px' }}
                                color="primary"
                                helperText="Enter ID of the Book"
                                fullWidth
                                id="filled-basic"
                                label="Book ID"
                                onChange={formHandler}
                            />

                            <TextField
                                name='title'
                                sx={{ paddingBottom: '10px' }}
                                color="primary"
                                helperText="Enter Name of the Book"
                                fullWidth
                                id="filled-basic"
                                label="Book Title"
                                onChange={formHandler} />

                            <TextField
                                name='author'
                                sx={{ paddingBottom: '10px' }}
                                color="primary"
                                helperText="Enter Author of the Book"
                                fullWidth
                                id="filled-basic"
                                label="Book Author"
                                onChange={formHandler} />

                            <TextField
                                name='category'
                                sx={{ paddingBottom: '10px' }}
                                color="primary"
                                helperText="Enter Category of the Book"
                                fullWidth
                                id="filled-basic"
                                label="Book Category"
                                onChange={formHandler} />

                            <Grid container>
                                <Grid item xs={5}>
                                    <TextField
                                        name='language'
                                        sx={{ paddingBottom: '10px' }}
                                        color="primary"
                                        helperText="Enter Language of the Book"
                                        fullWidth id="filled-basic"
                                        label="Book Language"
                                        onChange={formHandler} />
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={6}>
                                    <TextField
                                        name='qty'
                                        sx={{ paddingBottom: '10px' }}
                                        color="primary"
                                        helperText="Enter Author of the Book"
                                        fullWidth
                                        id="filled-basic"
                                        label="Book Quantity"
                                        onChange={formHandler} />
                                </Grid>
                                <input onChange={imgHandler} type="file" name="img" id="" style={{ backgroundColor: grey[200], padding: '10px' }} />
                            </Grid>
                            {prevImg && <img src={prevImg} alt="chosen" style={{ height: '100px' }} />}
                            <Button
                                variant='contained'
                                onClick={submitHandler}
                                sx={{
                                    bgcolor: green[300],
                                    border: 1,
                                    borderColor: green[900],
                                    color: green[900],
                                    "&:hover": { bgcolor: green[200] },
                                    marginTop: '10px'
                                }}><Iconify icon="bi:send" />&nbsp; Submit
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>

            </Modal>
        </div>
    );
}
