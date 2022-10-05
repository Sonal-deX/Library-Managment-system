import React from 'react';
import MUIDrawer from './drawer';
import Books from './main/books/book';
import Papers from './main/paper';
import Pdfs from './main/pdf';
import Students from '../student/student';
import Teachers from '../teacher/teacher';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { useState } from 'react';

function AdminPanel() {

    const [comState, SetcomState] = useState("Books")

    const stateChangeHandler = (state)=>{
        SetcomState(state)
    }

    return (
        <React.Fragment>
            <Box>
                <Grid container >
                    <Grid item xs={2}>
                        <MUIDrawer stateHandler={stateChangeHandler} />
                    </Grid>
                    <Grid item xs={10}>
                        {comState === "Books" && <Books />}
                        {comState === "Papers" && <Papers />}
                        {comState === "PDFs" && <Pdfs />}
                        {comState === "Students" && <Students />}
                        {comState === "Teachers" && <Teachers/>}
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default AdminPanel;