import { useCallback, useMemo, useState, useEffect } from 'react';
//import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
//import { useSelection } from 'src/hooks/use-selection';
//import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MembersTable } from './MembersTable';
//import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from './apply-pagination';
import PropTypes from 'prop-types';
import * as API from '../../actions/API.js';
import RefreshIcon from '@mui/icons-material/Refresh';

const now = new Date();


const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097',
    entry: '09:00 AM',
    exit: '11:00 AM'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711',
    entry: '09:00 AM',
    // exit: '11:00 AM'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive',
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682',
    entry: '10:00 AM',
    exit: '12:00 PM'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street',
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242',
    entry: '10:00 AM',
    // exit: '12:00 PM'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106',
    entry: '10:10 AM',
    exit: '01:00 PM'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409',
    entry: '10:10 AM',
    exit: '2:00 PM'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647',
    entry: '10:30 AM',
    exit: '12:00 PM'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654',
    entry: '10:30 AM',
    exit: '12:00 PM'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947',
    entry: '10:30 AM',
    exit: '11:00 PM'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894',
    entry: '10:30 AM',
    exit: '12:00 PM'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
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

const Members = (props) => {


  const gymId = props;
  const membersUpdated = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  //const customersSelection = useSelection(customersIds);

  const [checkedInMembers, setCheckedInMembers] = useState([]);

  useEffect(() => {
    console.log(gymId)
    //make an API call!               
    API.getCheckedInUsers(gymId)
      .then(response => {
        const modifiedCheckedInUsers = response.data.map(schedule => {
          
          const checkInDateTime = schedule.checkinDateTime;
          const checkInDate = checkInDateTime[0] + '-' + checkInDateTime[1].toString().padStart(2, '0') + '-' + checkInDateTime[2].toString().padStart(2, '0')
          const checkInHours = checkInDateTime[3];
          const checkInMins = checkInDateTime[4];
          const checkInTime = checkInDateTime[3].toString().padStart(2, '0') + ':' + checkInDateTime[4].toString().padStart(2, '0')
          const period = (checkInHours >= 0 && checkInHours < 12) ? 'AM' : 'PM';
          const checkIntimeOnly = checkInTime + ' ' + period;

          let checkoutimeOnly;
          if (schedule.checkoutDateTime !== null) {
            const checkoutDateTime = schedule.checkoutDateTime;
            const checkoutDate = checkoutDateTime[0] + '-' + checkoutDateTime[1].toString().padStart(2, '0') + '-' + checkoutDateTime[2].toString().padStart(2, '0')
            const checkoutHours = checkoutDateTime[3];
            const checkoutMins = checkoutDateTime[4];
            const checkoutTime = checkoutDateTime[3] + ':' + checkoutDateTime[4]
            const period = (checkInHours >= 0 && checkInHours < 12) ? 'AM' : 'PM';
            checkoutimeOnly = checkInTime + ' ' + period
          }

          return {
            ...schedule,
            classDate: checkInDate,
            entryTimeOnly: checkIntimeOnly,
            exitTimeOnly: checkoutimeOnly
          };
        });
        setCheckedInMembers(modifiedCheckedInUsers)
      })
      .catch(error => {
        console.log(error);
      })
  }, [membersUpdated, checkoutClicked])

  const handleCheckoutClick = () => {
    // from child component - MembersTable
    setCheckoutClicked(!checkoutClicked)
  };

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
                  Checked-In Members
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
              {/* <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <RefreshIcon />
                  </SvgIcon>
                )}
                variant="contained"
                size='small'
              >
                Refresh
              </Button> */}
            </Stack>
            <MembersTable
              count={checkedInMembers.length}
              items={checkedInMembers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              onCheckoutClick={handleCheckoutClick}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};



export default Members;

Members.propTypes = {
  gymId: PropTypes.string, //number
};