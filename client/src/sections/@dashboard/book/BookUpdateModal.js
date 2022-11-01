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

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

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

export default function BookUpdateModal(props) {



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [bookid, setBookid] = React.useState()
    const [booktitle, setBooktitle] = React.useState()
    const [bookauthor, setBookauthor] = React.useState()
    const [bookcategory, setBookcategory] = React.useState()
    const [booklanguage, setBooklanguage] = React.useState()
    const [bookqty, setBookqty] = React.useState()

    const [updatePrevimg, setupdatePrevimg] = React.useState()
    const [prevImg, setprevimg] = React.useState()
    const [img, setimg] = React.useState()
    const [checkImg,setcheckImg] = React.useState()

    const formHandler = (e) => {
        e.target.name === 'bookId' ? setBookid(e.target.value)
            : e.target.name === 'title' ? setBooktitle(e.target.value)
                : e.target.name === 'category' ? setBookcategory(e.target.value)
                    : e.target.name === 'qty' ? setBookqty(e.target.value)
                        : e.target.name === 'language' ? setBooklanguage(e.target.value)
                            : setBookauthor(e.target.value)

    }

    React.useEffect(() => {
        if (props.book.img !=='null') {
            setprevimg(`https://res.cloudinary.com/dvn2f46xi/image/upload/v1665732359/${props.book.img}`)
            setimg(props.book.img)
            setupdatePrevimg(props.book.img)
        } else {
            setprevimg(`https://res.cloudinary.com/dvn2f46xi/image/upload/v1665768651/library/No-Image-Placeholder.svg_lnp07f.png`)
            setupdatePrevimg('null')
        }
        setBookid(props.book.bookId)
        setBooktitle(props.book.title)
        setBookauthor(props.book.author)
        setBookcategory(props.book.category)
        setBooklanguage(props.book.language)
        setBookqty(props.book.qty)

    }, [])

    const imgHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const imgCheck = reader.result.includes('video')
            if(imgCheck === true) {
                console.log("not an image");
            }
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
            img: [img, updatePrevimg]
        }
        axios.put(`http://localhost:8000/book/update/${props.book._id}`, data)
            .then((response) => {
                if (response.data.success) {
                    setOpen(false)
                    props.onClose(false)
                    props.bookReload(false)
                }
            })
            .catch((error) => {
                console.log(error);

            })
    }

    return (
        <div>

            <MenuItem onClick={handleOpen} component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
                <ListItemIcon>
                    <Iconify sx={{ color: 'orange' }} icon="eva:edit-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>

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
                            Edit Book
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
                            defaultValue={props.book.bookId}
                        />

                        <TextField
                            name='title'
                            sx={{ paddingBottom: '10px' }}
                            color="primary"
                            helperText="Enter Name of the Book"
                            fullWidth
                            id="filled-basic"
                            label="Book Title"
                            onChange={formHandler}
                            defaultValue={props.book.title}
                        />


                        <TextField
                            name='author'
                            sx={{ paddingBottom: '10px' }}
                            color="primary"
                            helperText="Enter Author of the Book"
                            fullWidth
                            id="filled-basic"
                            label="Book Author"
                            onChange={formHandler}
                            defaultValue={props.book.author}
                        />

                        <TextField
                            name='category'
                            sx={{ paddingBottom: '10px' }}
                            color="primary"
                            helperText="Enter Category of the Book"
                            fullWidth
                            id="filled-basic"
                            label="Book Category"
                            onChange={formHandler}
                            defaultValue={props.book.category}
                        />

                        <Grid container>
                            <Grid item xs={5}>
                                <TextField
                                    name='language'
                                    sx={{ paddingBottom: '10px' }}
                                    color="primary"
                                    helperText="Enter Language of the Book"
                                    fullWidth id="filled-basic"
                                    label="Book Language"
                                    onChange={formHandler}
                                    defaultValue={props.book.language}
                                />
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
                                    onChange={formHandler}
                                    defaultValue={props.book.qty}
                                />
                            </Grid>
                            <input onChange={imgHandler} type="file" name="img" id="" style={{ backgroundColor: grey[200], padding: '10px' }} />
                        </Grid>
                        {prevImg && <img src={prevImg} alt="chosen" style={{ height: '100px', marginTop: '2px' }} />}
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
