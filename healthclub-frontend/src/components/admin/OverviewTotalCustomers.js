import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewTotalCustomers = (props) => {
  const { difference, positive = false, sx, value, overviewType, iconElement, footerText } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {overviewType}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: '#1976D2',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              {/* <UsersIcon /> */} {iconElement}
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Typography
              color="green"
              variant="caption"
            >
              {footerText}
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {/* {positive ? <ArrowUpIcon /> : <ArrowDownIcon />} */}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {/* {difference}% */}
              </Typography>
            </Stack>

          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.number,   //string.isRequired,
  sx: PropTypes.object,
  overviewType: PropTypes.string,
  iconElement: PropTypes.element.isRequired,
  footerText: PropTypes.string
};
