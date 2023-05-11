import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  SvgIcon,
  Button
} from '@mui/material';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PersonIcon from '@mui/icons-material/Person';
// import { Scrollbar } from 'src/components/scrollbar';
// import { getInitials } from 'src/utils/get-initials';
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as API from '../../actions/API.js';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const MembersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const today = new Date();
  const hour = today.getHours();
  const time = today.toLocaleTimeString('en', { hour: 'numeric', hour12: true, minute: 'numeric' });


  const [errorReg, setErrorReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCheckout = (userGymVisitId) => {
    console.log('user_Gym_vist_I=>', userGymVisitId)
    const data = { userGymVisitId };
    API.checkOutMembers(data)
      .then(response => {
        console.log(response.data);
        setErrorReg(false);
        props.onCheckoutClick()
      })
      .catch(error => {
        console.log('error in checkout')
        console.log(error);
        setErrorReg(true);
        setErrorMessage(error.response.data);
      })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Card>
        {/* <Scrollbar> */}
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Entry Time
                </TableCell>
                <TableCell>
                  Exit Time
                </TableCell>
                <TableCell>
                  {/* Mark Exit */}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.userGymVisitId);

                return (
                  <TableRow
                    hover
                    key={customer.userGymVisitId}
                    selected={isSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        {/* <PersonIcon fontSize='xs' /> */}
                        {/* <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                          {customer.name}
                        </Avatar> */}
                        <Typography variant="subtitle2">
                          {customer.user.firstName} {customer.user.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.user.email}
                    </TableCell>
                    <TableCell>
                      {customer.classDate}
                    </TableCell>
                    <TableCell>
                      {customer.entryTimeOnly}
                    </TableCell>
                    <TableCell>
                      {customer.exitTimeOnly}
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={(
                          <SvgIcon fontSize="small">
                            <AccessTimeFilledIcon />
                          </SvgIcon>
                        )}
                        variant="contained"
                        disabled={customer.exitTimeOnly ? true : false}
                        onClick={() => handleCheckout(customer.userGymVisitId)}
                      >
                        Check-out
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {/* </Scrollbar> */}
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <Stack spacing={2} sx={{ width: '100%' }}>
        {errorReg === false ? (
          <Snackbar open={open} autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Member is checked-out successfully.
            </Alert>
          </Snackbar>
        ) :
          <Snackbar open={open} autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        }
      </Stack>
    </>

  );
};

MembersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};