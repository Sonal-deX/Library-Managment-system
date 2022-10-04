import * as React from 'react';
import { Box, Typography } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { green, grey } from '@mui/material/colors';
import { List } from '@mui/material';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function MUIDrawer(props) {

    const [btnIndex, setbtnIndex] = useState(0)

    return (
        <React.Fragment>

            <Box sx={{ bgcolor: 'white' }}>
                <Typography variant='h4' align='center' sx={{ marginY: '20px', color: green[900] }}> Dashboard</Typography>
                <Divider />
                <List sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'white', justifyContent: 'start', alignItems: 'center' }}>
                    {['Books', 'Papers', 'PDFs', 'Students', 'Teachers'].map((text, index) => {
                        return (

                            <Button
                                onClick={() => {
                                    props.stateHandler(text)
                                    setbtnIndex(index)
                                }}
                                key={index}
                                sx={{
                                    border: 1,
                                    borderColor: green[900],
                                    width: '200px',
                                    height: '45px',
                                    marginY: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    "&:hover": {
                                        bgcolor: green[200]
                                    },
                                    "&:active": {
                                        bgcolor: green[200]
                                    },
                                    bgcolor: btnIndex == index ? green[200] : 'white'
                                }}>
                                <Grid container>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3}>
                                        <ListItemIcon>
                                            {
                                                index + 1 == "1" ? <LibraryBooksIcon sx={{ color: green[900] }} /> :
                                                    index + 1 == "2" ? <ArticleIcon sx={{ color: green[900] }} /> :
                                                        index + 1 == "3" ? <PictureAsPdfIcon sx={{ color: green[900] }} /> :
                                                            index + 1 == "4" ? <GroupIcon sx={{ color: green[900] }} /> :
                                                                <AccountBoxIcon sx={{ color: green[900] }} />
                                            }
                                        </ListItemIcon>
                                    </Grid>
                                    <Grid item xs={6}><Typography sx={{ color: green[900] }} style={{textTransform:'capitalize'}} variant='h6'>{text}</Typography></Grid>
                                    <Grid item xs={2}></Grid>
                                </Grid>


                            </Button>
                        )
                    })}

                </List>
                <Divider />
                <Typography sx={{ margin: '15px' }} align='center'> <button style={{ border: 'none', backgroundColor: 'white' }}><ArrowBackIcon sx={{ padding: '5px', borderRadius: '50px', bgcolor: green[300] }} /></button></Typography>

            </Box>

        </React.Fragment>
    );
}
