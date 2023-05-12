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


export const MemberScheduleTable = (props) => {
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
              <TableCell>
                Location
              </TableCell>
              <TableCell>
                Start Time
              </TableCell>
              <TableCell>
                End Time
              </TableCell>
              <TableCell>
                Trainer
              </TableCell>
              <TableCell>
                Max Occupancy
              </TableCell>
              <TableCell>
                Reservation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((schedule) => {
              const isSelected = selected.includes(schedule.scheduleId);
              return (
                <TableRow
                  hover
                  key={schedule.scheduleId}
                  selected={isSelected}
                >
                  <TableCell>
                    {schedule.gym.address}, {schedule.gym.city}, {schedule.gym.state}
                  </TableCell>
                  <TableCell>
                    {schedule.startTimeOnly}
                  </TableCell>
                  <TableCell>
                    {schedule.endTimeOnly}
                  </TableCell>
                  <TableCell>
                    {schedule.trainer}
                  </TableCell>
                  <TableCell>
                    {schedule.maxOccupancy}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <AccessTimeFilledIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                      // disabled={schedule.exit ? true : false}
                    >
                      Reserve Seat
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

MemberScheduleTable.propTypes = {
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