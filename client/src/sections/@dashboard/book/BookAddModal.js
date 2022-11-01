import * as React from 'react';
import { Grid, TextField, createTheme, ThemeProvider, Card, Container, colors } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../../../components/Iconify';
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

    

    const [bookid, setBookid] = React.useState()
    const [booktitle, setBooktitle] = React.useState()
    const [bookauthor, setBookauthor] = React.useState()
    const [bookcategory, setBookcategory] = React.useState()
    const [booklanguage, setBooklanguage] = React.useState()
    const [bookqty, setBookqty] = React.useState()

    const [prevImg, setprevimg] = React.useState()
    const [img, setimg] = React.useState()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
        setprevimg()
    };

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
            img: [img, 'null']
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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>

                    <ThemeProvider theme={theme}>
                        <Typography
                            variant='h4'
                            sx={{ paddingBottom: '10px', color: green[600] }}>
                            Add Book
                        </Typography>

                        <TextField
                            name='bookId'
                            sx={{ paddingBottom: '10px' }}
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
                            <input onChange={imgHandler} value={''} type="file" name="img" id="" style={{ backgroundColor: grey[200], padding: '10px' }} />
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


                </DialogContent>
            </Dialog>
        </div>
    );
}
