import * as React from 'react';
import { Grid, TextField, createTheme, ThemeProvider, Card, Container, colors } from '@mui/material';
import { green, grey, blue, red } from '@mui/material/colors';
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


import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';


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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const bookDeleteHandler = () => {
        props.book.status = 2
        const data = props.book
        axios.delete(`http://localhost:8000/book/delete/${props.book._id}`, {data})
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

    const closeHandler = () => {
        handleClose()
        props.onClose(false)
    }

    return (
        <div>

            <MenuItem onClick={handleClickOpen} component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
                <ListItemIcon >
                    <Iconify sx={{ color: 'red' }} icon="eva:trash-2-outline" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>

            {/* <Button variant="contained" sx={{ bgcolor: green[600], ":hover": { bgcolor: green[700] } }} startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>New Book</Button> */}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Box>
                        <Typography sx={{ marginBottom: '10px' }}>Are you sure you want to Delete this Book?</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button variant='contained' onClick={bookDeleteHandler} sx={{ bgcolor: red[500], "&:hover": { bgcolor: red[700] } }} >Yes</Button>
                            <Button variant='contained' onClick={closeHandler} sx={{ bgcolor: green[500], "&:hover": { bgcolor: green[700] } }}>No</Button>
                        </Box>
                    </Box>

                </DialogContent>
            </Dialog>

        </div>
    );
}