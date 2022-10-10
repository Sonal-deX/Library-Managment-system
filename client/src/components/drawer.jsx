import React from 'react';
import { Drawer, Box, Typography, IconButton, Container, Avatar, Stack, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { green, grey } from '@mui/material/colors';
import { useState } from 'react';
import { createTheme } from '@mui/material';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export default function DrawerMenu(props) {

  const [btnIndex, setbtnIndex] = useState(0)

  return (
    <React.Fragment>

      <Container sx={{ height: '90px' }}></Container>

      <Container sx={{ display: 'flex', height: '80px', bgcolor: grey[300], width: '90%', borderRadius: '12px', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'white' }} src="/admin.png" alt='admin' />
        <Typography fontWeight='bold' paddingLeft={'30px'}>Admin</Typography>
      </Container>

      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>

        {['Books', 'Papers', 'PDFs', 'Students', 'Teachers'].map((text, index) => {
          return (

            <Button

              onClick={() => {
                props.stateHandler(text)
                setbtnIndex(index)
              }}

              key={index}
              sx={{
                height: '58px',
                marginX: "5px",
                marginY: '1px',
                borderRadius: '12px',
                "&:hover": { bgcolor: btnIndex == index ? green[100] : grey[200] },
                justifyContent: 'start',
                color: props.displayState == text ? green[900] : grey[800],
                bgcolor: props.displayState == text ? green[100] : 'white'

              }}>
              <Typography  >
                {
                  index + 1 == "1" ? <LibraryBooksIcon sx={{ marginTop: '6px', marginLeft: "8px" }} /> :
                    index + 1 == "2" ? <ArticleIcon sx={{ marginTop: '6px', marginLeft: "8px" }} /> :
                      index + 1 == "3" ? <PictureAsPdfIcon sx={{ marginTop: '6px', marginLeft: "8px" }} /> :
                        index + 1 == "4" ? <GroupIcon sx={{ marginTop: '6px', marginLeft: "8px" }} /> :
                          <AccountBoxIcon sx={{ marginTop: '6px', marginLeft: "8px" }} />
                }
              </Typography>
              <Typography textTransform='capitalize'
                sx={{
                  marginLeft: '20px',
                  fontWeight: props.displayState == text ? 'medium' : 'light',
                }} >{text}</Typography>

            </Button>
          )
        })}

      </Box>



    </React.Fragment>
  )
}


