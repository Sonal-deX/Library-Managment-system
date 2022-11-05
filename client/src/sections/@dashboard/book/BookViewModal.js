import * as React from 'react';
import { Grid, TextField, createTheme, ThemeProvider, Card, Container, colors } from '@mui/material';
import Label from '../../../components/Label';
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
        axios.delete(`http://localhost:8000/book/delete/${props.book._id}`, { data })
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

            <Typography onClick={handleClickOpen} variant="subtitle2" sx={{ cursor: 'pointer' }} noWrap>
                {props.title}
            </Typography>


            {/* <Button variant="contained" sx={{ bgcolor: green[600], ":hover": { bgcolor: green[700] } }} startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>New Book</Button> */}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogContent sx={{ padding: '0px' }}>
                    <Grid container sx={{padding:'30px'}}>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}><img style={{ borderRadius: '10px',height:'300px',width:'300px' }}
                            src={`https://res.cloudinary.com/dvn2f46xi/image/upload/q_100/${props.data.img}`} />
                        </Grid>
                        <Grid item xs={12} sm={5} sx={{ display: 'flex', flexDirection: 'column', margin: '7px', display: 'flex', justifyContent: 'center' }}>
                            <table style={{ height: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>Title:</th>
                                        <td style={{ textAlign: 'center' }}>{props.data.title}</td>
                                    </tr>
                                    <tr>
                                        <th>Author:</th>
                                        <td style={{ textAlign: 'center' }}>{props.data.author}</td>
                                    </tr>
                                    <tr>
                                        <th>Language:</th>
                                        <td style={{ textAlign: 'center' }}>{props.data.language}</td>
                                    </tr>
                                    <tr>
                                        <th>Category:</th>
                                        <td style={{ textAlign: 'center' }}>{props.data.category}</td>
                                    </tr>
                                    <tr>
                                        <th>Quantity:</th>
                                        <td style={{ textAlign: 'center' }}>{props.data.qty}</td>
                                    </tr>
                                    <tr>
                                        <th>Availability:</th>
                                        <td style={{ textAlign: 'center' }}>
                                            <Label variant="ghost" color={(props.data.availability === 2 && 'error') || 'success'}>
                                                {props.data.availability === 1 ? 'Available' : 'Not Available'}
                                            </Label>
                                        </td>
                                    </tr>
                                    {props.data.description &&
                                        <tr>
                                            <th>Description:</th>
                                            <td style={{ textAlign: 'center' }}>{props.data.description}</td>
                                        </tr>}
                                </tbody>

                            </table>
                            {/* <Typography sx={{marginBottom:'4px'}} textAlign={'center'} variant="" ><h4 style={{ display: 'inline', fontWeight: 'bold' }}>Title:</h4> {props.data.title}</Typography>
                            <Typography sx={{marginBottom:'4px'}} textAlign={'center'} variant="" ><h4 style={{ display: 'inline', fontWeight: 'bold' }}>Author:</h4> {props.data.author}</Typography>
                            <Typography sx={{marginBottom:'4px'}} textAlign={'center'} variant="" ><h4 style={{ display: 'inline', fontWeight: 'bold' }}>Language:</h4> {props.data.language}</Typography>
                            <Typography sx={{marginBottom:'4px'}} textAlign={'center'} variant="" ><h4 style={{ display: 'inline', fontWeight: 'bold' }}>Category:</h4> {props.data.category}</Typography>
                            <Typography sx={{marginBottom:'4px'}} textAlign={'center'} variant="" ><h4 style={{ display: 'inline', fontWeight: 'bold' }}>Quantity:</h4> {props.data.qty}</Typography>
                            <Typography sx={{marginBottom:'4px'}} textAlign={'center'} variant="" ><h4 style={{ display: 'inline', fontWeight: 'bold' }}>Availability: </h4>
                                <Label variant="ghost" color={(props.data.availability === 2 && 'error') || 'success'}>
                                    {props.data.availability === 1 ? 'Available' : 'Not Available'}
                                </Label>
                            </Typography>
                            {props.data.description && <Typography sx={{marginBottom:'4px'}} textAlign={'center'} variant="" ><h4 style={{ display: 'inline', fontWeight: 'bold' }}>Description:</h4> {props.data.description}</Typography>} */}
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

        </div>
    );
}