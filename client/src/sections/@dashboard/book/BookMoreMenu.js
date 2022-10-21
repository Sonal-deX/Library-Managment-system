import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import BookUpdateModal from './BookUpdateModal';
import BookDeleteModal from './BookDeleteModal';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

export default function BookMoreMenu(props) {

  const book = props.selectedBook;

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = (value) => {
    setIsOpen(value)
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 180, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify sx={{color:'red'}} icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText  primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}


        <BookDeleteModal onClose={closeHandler} book={book} bookReload={props.bookReload} />
        <BookUpdateModal onClose={closeHandler} book={book} bookReload={props.bookReload} />

        {/* <ListItemIcon>
            <Iconify sx={{color:'orange'}} icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText  primary="Edit" primaryTypographyProps={{ variant: 'body2' }} /> */}

      </Menu>
    </>
  );
}
