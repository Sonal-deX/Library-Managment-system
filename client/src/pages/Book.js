import { filter } from 'lodash';
import axios from 'axios';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  capitalize
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { BookListHead, BookListToolbar, BookMoreMenu, BookModal,BookViewModal } from '../sections/@dashboard/book';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'BookID', alignRight: false },
  { id: 'title', label: '.Title', alignRight: false },
  { id: 'author', label: 'Author', alignRight: false },
  { id: 'mdm', label: 'Medium', alignRight: false },
  { id: 'ctgry', label: 'Category', alignRight: false },
  { id: 'qty', label: 'Quantity', alignRight: false },
  { id: 'avl', label: 'Availability', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Book() {

  const [book, setBook] = useState([])
  const [seacrhData, setSeacrhData] = useState([])
  const [searchKey, setSearchKey] = useState()
  const [clearSearchKey, setClearSearchKey] = useState(true)

  const [bookReload, setBookReload] = useState()

  const addbookReload = (value) => {
    setBookReload(value)
  }

  useEffect(() => {
    
    setBookReload(true)
    axios.get("http://localhost:8000/book")
      .then(res => {
        setBook(res.data.data)
        setSeacrhData(res.data.data)
        setClearSearchKey(!clearSearchKey)
      })
      .catch(err => {
        console.log(err);
      })
  }, [bookReload])

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === 'title' && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy('title');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterData = (searchKey) => {
    setSearchKey(searchKey);
    searchKey = searchKey.toLowerCase()
    const result = book.filter((book) =>
      book.title.toLowerCase().includes(searchKey)
    )
    setSeacrhData(result)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - book.length) : 0;

  const books = applySortFilter(seacrhData, getComparator(order, orderBy), filterName);

  const isNotFound = books.length === 0;



  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ color: green[600] }}>
            Books
          </Typography>

          <BookModal bookReload={addbookReload} />

        </Stack>

        <Card>
          <BookListToolbar onFilterName={filterData} clearS={clearSearchKey} name={"book"} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BookListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={books.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((book, index) => {

                    return (
                      <TableRow
                        hover
                        key={book.bookId}
                        tabIndex={-1}
                      >
                        <TableCell align="left">{book.bookId}</TableCell>
                        <TableCell component="th" scope="row" >
                          <Typography variant="subtitle2" sx={{ cursor: 'pointer' }} noWrap>
                            
                            <BookViewModal title={book.title} data={book}/>
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{book.author}</TableCell>
                        <TableCell align="left">{book.language}</TableCell>
                        <TableCell align="left">{book.category}</TableCell>
                        <TableCell align="left">{book.qty}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(book.availability === 2 && 'error') || 'success'}>
                            {book.availability === 1 ? sentenceCase('Available') : sentenceCase('Not Available')}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          <BookMoreMenu selectedBook={book} bookReload={addbookReload} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={searchKey} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
