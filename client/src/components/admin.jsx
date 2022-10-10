import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import DrawerMenu from './drawer';
import { Box, useMediaQuery, } from '@mui/material'
import ResBox from './resBox';
import Book from './Book/book';
import Paper from './Paper/paper';
import Pdf from './Pdf/pdf';
import Student from './Student/student';
import Teacher from './Teacher/teacher';


export default function Admin() {
    const isActive = useMediaQuery('(min-width:900px)')

    const [comState, SetcomState] = useState("Books")
    const stateChangeHandler = (state) => {
        SetcomState(state)
    }

    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin' element={
                        <>
                            <Box sx={{ height: isActive && '100vh', display: 'flex', flexDirection: isActive ? 'row' : 'column' }}>

                                {isActive == true ?
                                    <Box
                                        sx={{
                                            paddingX: '2px',
                                            width: '250px',
                                            overflow: 'auto',
                                            height: '100vh',
                                            boxShadow: 3
                                        }}
                                        role='presentation'

                                    >
                                        <DrawerMenu stateHandler={stateChangeHandler} displayState={comState} />
                                    </Box>

                                    :
                                    <ResBox stateHandler={stateChangeHandler} displayState={comState} />
                                }

                                <Box>
                                    {comState === "Books" && <Book />}
                                    {comState === "Papers" && <Paper/>}
                                    {comState === "PDFs" && <Pdf/>}
                                    {comState === "Students" && <Student/>}
                                    {comState === "Teachers" && <Teacher/>}
                                </Box>

                            </Box>

                        </>
                    } />
                </Routes>
            </BrowserRouter>



        </React.Fragment>
    )
}
