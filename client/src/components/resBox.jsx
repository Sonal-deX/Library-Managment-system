import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawerMenu from './drawer';
import { Box, Grid, Container, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { green, grey } from '@mui/material/colors';
import { Drawer, Typography, IconButton, Avatar, Stack } from '@mui/material'



export default function ResBox(props) {

    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    bgcolor: 'red',
                    paddingY: '8px',
                    height: '50px',
                    width: "100%",

                }}>
                <IconButton sx={{ marginLeft: '10px' }} onClick={() => setOpen(true)}>
                    <MenuIcon
                        sx=
                        {{
                            color: green[900],
                            padding: '4px',
                        }}
                        fontSize='medium' />
                </IconButton>


            </Box>

            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    sx={{
                        padding: '2px',
                        width: '250px'
                    }}
                    role='presentation'
                >
                    <DrawerMenu stateHandler={props.stateHandler} displayState={props.displayState} />
                </Box>

            </Drawer>
        </React.Fragment>
    )
}
