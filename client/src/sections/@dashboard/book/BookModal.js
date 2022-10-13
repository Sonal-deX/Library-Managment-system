import * as React from 'react';
import { Grid, TextField, createTheme, ThemeProvider } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../../components/Iconify';


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

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [prevImg, setPrevImg] = React.useState()

    const imgHandler = () => {

    }

    const formHandler = () => {

    }
    const submitHandler = () => {

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
            >
                <Fade in={open}>
                    <Box sx={style} style={{ borderRadius: '16px' }}>
                        <ThemeProvider theme={theme}>
                            <Typography
                                variant='h4'
                                sx={{ paddingBottom: '20px', color: green[600] }}>
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
                                onChange={formHandler} />

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
                            {prevImg && <img src={prevImg} alt="chosen" style={{ height: '100px', marginTop: '5px', marginBottom: '10px' }} />}
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
                                }}><Iconify icon="bi:send" />&nbsp; Submit
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
