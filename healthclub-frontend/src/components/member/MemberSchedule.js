import { useCallback, useMemo, useState, useEffect } from 'react';
//import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
//import { useSelection } from 'src/hooks/use-selection';
//import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MemberScheduleTable } from './MemberScheduleTable';
//import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from '../admin/apply-pagination';
import PropTypes from 'prop-types';
import * as API from '../../actions/API.js';
import MemberNavbar from './MemberNavbar.js'

const useCustomers = (schedules, page, rowsPerPage) => {
  return useMemo(
    () => {
      return
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const MemberSchedule = (props) => {


  const gymId = 1;
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([])


  useEffect(() => {
    console.log('MemberSchedule is called' + gymId);
    API.fetchGymSchedule(gymId)
      .then(response => {
        const modifiedSchedules = response.data.map(schedule => {
          // setCity(schedule.gym.city);
          // setLocation(schedule.gym.address);
          const dateObject = new Date(schedule.startTime);
          const dateOnlyString = dateObject.toDateString();

          const startTimeOnly = schedule.startTime.split('T')[1].slice(0, 5);;
          const endTimeOnly = schedule.endTime.split('T')[1].slice(0, 5);;
          return {
            ...schedule,
            classDate: dateOnlyString,
            startTimeOnly: startTimeOnly,
            endTimeOnly: endTimeOnly
          };
        });

        setSchedules(modifiedSchedules)
        //setData(schedules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
        console.log(modifiedSchedules)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <MemberNavbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Class Schedules
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
            </Stack>
            {schedules.length}
            {schedules.length > 0 ? (
              <MemberScheduleTable
                count={schedules.length}
                items={schedules}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            ) : (
              <div>Loading...</div>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};



export default MemberSchedule;

MemberSchedule.propTypes = {
  gymId: PropTypes.string, //number
};