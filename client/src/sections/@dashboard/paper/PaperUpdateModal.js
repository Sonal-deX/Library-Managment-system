import * as React from 'react';
import { Grid, TextField, createTheme, ThemeProvider, Card, Container, colors, Select, MenuItem, InputLabel, FormControl, FormHelperText, ListItemIcon, ListItemText } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from '../../../components/Iconify';
import { Link as RouterLink } from 'react-router-dom';
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

    const [paperType, setPaperType] = React.useState('');
    const [language, setLanguage] = React.useState('');

    const handleChange = (event) => {
        if (event.target.name === 'paperType') {
            setPaperType(event.target.value);
        } else {
            setLanguage(event.target.value);
        }
    };

    const [paperid, setPaperid] = React.useState()
    const [paperGrade, setPaperGrade] = React.useState()
    const [paperSubject, setPaperSubject] = React.useState()
    const [paperYear, setPaperYear] = React.useState()
    const [paperqty, setPaperqty] = React.useState()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    React.useEffect(() => {
        setPaperid(props.paper.paperId)
        setPaperGrade(props.paper.grade)
        setPaperSubject(props.paper.subject)
        setPaperYear(props.paper.year)
        setPaperqty(props.paper.qty)
        setPaperType(props.paper.paperType)
        setLanguage(props.paper.language)

    }, [])

    const formHandler = (e) => {
        e.target.name === 'paperId' ? setPaperid(e.target.value)
            : e.target.name === 'grade' ? setPaperGrade(e.target.value)
                : e.target.name === 'subject' ? setPaperSubject(e.target.value)
                    : e.target.name === 'qty' ? setPaperqty(e.target.value)
                        : setPaperYear(e.target.value)

    }

    const submitHandler = () => {
        let data = {
            paperId: paperid,
            grade: paperGrade,
            subject: paperSubject,
            language: language,
            year: paperYear,
            qty: paperqty,
            paperType: paperType
        }
        axios.put(`http://localhost:8000/paper/update/${props.paper._id}`, data)
        .then((response) => {
            if (response.data.success) {
                setOpen(false)
                props.onClose(false)
                props.reload(false)
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

                    <FormControl>
                        <ThemeProvider theme={theme}>
                            <Typography
                                variant='h4'
                                sx={{ paddingBottom: '10px', color: green[600] }}>
                                Update Paper
                            </Typography>
                            <TextField
                                name='paperId'
                                sx={{ paddingBottom: '10px' }}
                                color="primary"
                                helperText="Enter ID of the Paper"
                                fullWidth
                                id="filled-basic"
                                label="Paper ID*"
                                onChange={formHandler}
                                defaultValue={props.paper.paperId}
                            />

                            <TextField
                                name='grade'
                                sx={{ paddingBottom: '10px' }}
                                color="primary"
                                helperText="Select Grade "
                                fullWidth
                                id="filled-basic"
                                label="Grade*"
                                onChange={formHandler}
                                defaultValue={props.paper.grade}
                            />

                            <TextField
                                name='subject'
                                sx={{ paddingBottom: '10px' }}
                                color="primary"
                                helperText="Enter subject "
                                fullWidth
                                id="filled-basic"
                                label="Subject*"
                                onChange={formHandler}
                                defaultValue={props.paper.subject}
                            />

                            <Grid container>
                                <Grid item xs={5}>
                                    <TextField
                                        name='year'
                                        sx={{ paddingBottom: '10px' }}
                                        color="primary"
                                        helperText="Select year"
                                        fullWidth id="filled-basic"
                                        label="Year*"
                                        onChange={formHandler}
                                        defaultValue={props.paper.year}
                                    />
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Paper Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={paperType}
                                            label="Paper Type"
                                            onChange={handleChange}
                                            name='paperType'
                                        >
                                            <MenuItem value={'School Paper'}>School Paper</MenuItem>
                                            <MenuItem value={'Provincial Paper'}>Provincial Paper</MenuItem>
                                            <MenuItem value={'Zonal Paper'}>Zonal Paper</MenuItem>
                                            <MenuItem value={'GCE O/L Past Paper'}>G.C.E O/L Past Paper</MenuItem>
                                            <MenuItem value={'GCE A/L Past Paper'}>G.C.E A/L Past Paper</MenuItem>
                                        </Select>
                                        <FormHelperText>Select Paper Type</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <FormControl fullWidth sx={{ marginBottom: '10px' }} >
                                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={language}
                                        label="Language"
                                        onChange={handleChange}
                                        name='language'
                                    >
                                        <MenuItem value={'English'}>English</MenuItem>s
                                        <MenuItem value={'Sinhala'}>Sinhala</MenuItem>
                                        <MenuItem value={'Tamil'}>Tamil</MenuItem>
                                    </Select>
                                    <FormHelperText>Select Language</FormHelperText>
                                </FormControl>
                                <TextField
                                    name='qty'
                                    sx={{ paddingBottom: '10px' }}
                                    color="primary"
                                    helperText="Enter Quantity"
                                    fullWidth
                                    id="filled-basic"
                                    label="Quantity*"
                                    onChange={formHandler}
                                    defaultValue={props.paper.qty}
                                />

                            </Grid>
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
                    </FormControl>




                </DialogContent>
            </Dialog>
        </div>
    );
}
