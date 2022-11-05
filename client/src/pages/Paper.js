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
} from '@mui/material';
import { green, grey } from '@mui/material/colors';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { BookListHead } from '../sections/@dashboard/book';
import { PaperAddModal } from 'src/sections/@dashboard/paper';
import { BookListToolbar } from '../sections/@dashboard/book';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'PaperID', alignRight: false },
  // { id: 'title', label: 'Title', alignRight: false },
  { id: 'subject', label: 'Subject', alignRight: false },
  { id: 'year', label: 'Year', alignRight: false },
  { id: 'grade', label: 'Grade', alignRight: false },
  { id: 'language', label: 'Language', alignRight: false },
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

  const [Paper, setPaper] = useState([])
  const [seacrhData, setSeacrhData] = useState([])
  const [searchKey, setSearchKey] = useState()
  const [clearSearchKey, setClearSearchKey] = useState(true)
  const [paperReload, setPaperReload] = useState()

  const addpaperReload = (value) => {
    setPaperReload(value)
  }

  useEffect(() => {
    setPaperReload(true)
    axios.get("http://localhost:8000/paper")
      .then(res => {
        setPaper(res.data.data)
        setSeacrhData(res.data.data)
        setClearSearchKey(!clearSearchKey)
      })
      .catch(err => {
        console.log(err);
      })
  }, [paperReload])

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === 'year' && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy('year');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterData = (searchKey) => {
    searchKey = searchKey.toLowerCase()
    const result = Paper.filter((paper) =>
      paper.subject.toLowerCase().includes(searchKey) || paper.grade.toString().includes(searchKey)
    )
    setSeacrhData(result)
  }

  const handleFilterByName = (event) => {
    const searchKey = event.target.value
    setSearchKey(searchKey)
    filterData(searchKey)
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Paper.length) : 0;

  const papers = applySortFilter(seacrhData, getComparator(order, orderBy), filterName);

  const isUserNotFound = papers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" sx={{ color: green[600] }}>
            Papers
          </Typography>

          <PaperAddModal paperReload={addpaperReload} />

        </Stack>

        <Card>
          <BookListToolbar onFilterName={filterData} clearS={clearSearchKey} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BookListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={papers.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {papers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((paper, index) => {

                    return (
                      <TableRow
                        hover
                        key={paper.paperId}
                        tabIndex={-1}
                      >
                        <TableCell align="left">{paper.paperId}</TableCell>
                        <TableCell align="left">{paper.subject}</TableCell>
                        <TableCell align="left">{paper.year}</TableCell>
                        <TableCell align="left">{paper.grade}</TableCell>
                        <TableCell align="left">{paper.language}</TableCell>
                        <TableCell align="left">{paper.qty}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(paper.availability === 2 && 'error') || 'success'}>
                            {paper.availability === 1 ? sentenceCase('Available') : sentenceCase('Not Available')}
                          </Label>
                        </TableCell>
                        <TableCell align="right">

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

                {isUserNotFound && (
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
            count={papers.length}
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
