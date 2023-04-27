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

export const CustomersTable = (props) => {
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


  return (
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
                Location
              </TableCell>
              <TableCell>
                Phone
              </TableCell>
              {/* <TableCell>
                Signed Up
              </TableCell> */}
              <TableCell>
                Entry Time
              </TableCell>
              <TableCell>
                Exit Time
              </TableCell>
              <TableCell>
                Mark Exit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((customer) => {
              const isSelected = selected.includes(customer.id);
              const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

              return (
                <TableRow
                  hover
                  key={customer.id}
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
                        {customer.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.address.city}, {customer.address.state}, {customer.address.country}
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  {/* <TableCell>
                    {createdAt}
                  </TableCell> */}
                  <TableCell>
                    {customer.entry}
                  </TableCell>
                  <TableCell>
                    {customer.exit}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <AccessTimeFilledIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                      disabled={customer.exit?true:false}
                    >
                      Exit Time
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
  );
};

CustomersTable.propTypes = {
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