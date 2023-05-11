import PropTypes from 'prop-types';
import {
    Box,
    Card,
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
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import * as API from '../../actions/API.js';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const FreeTrailMembersTable = (props) => {
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

    const handleUpgrade = (freeTrailMemberId) => {
        console.log('freeTrailMemberId=>', freeTrailMemberId)
        const data = { 'userId': freeTrailMemberId };
        API.upgradeFreeTrailMembers(data)
            .then(response => {
                console.log(response.data);
                setErrorReg(false);
                props.onUpgradeClick()
            })
            .catch(error => {
                console.log('error in upgrade')
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
                                <TableCell>
                                    <b>First Name</b>
                                </TableCell>
                                <TableCell>
                                    <b>Last Name</b>
                                </TableCell>
                                <TableCell>
                                    <b> Email</b>
                                </TableCell>
                                <TableCell>
                                    {/* Mark Exit */}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((freeTrailMembers) => {
                                const isSelected = selected.includes(freeTrailMembers.id);
                                return (
                                    <TableRow hover key={freeTrailMembers.id} selected={isSelected}>
                                        <TableCell>
                                            <Stack alignItems="center" direction="row" spacing={2}>
                                                {/* <PersonIcon fontSize='xs' /> */}
                                                {/* <Avatar src={freeTrailMembers.avatar}>
                          {getInitials(freeTrailMembers.name)}
                          {freeTrailMembers.name}
                        </Avatar> */}
                                                <Typography variant="subtitle2">
                                                    {freeTrailMembers.firstName}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {freeTrailMembers.lastName}
                                        </TableCell>
                                        <TableCell>
                                            {freeTrailMembers.email}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                startIcon={(
                                                    <SvgIcon fontSize="small">
                                                        <CardMembershipIcon />
                                                    </SvgIcon>
                                                )}
                                                variant="contained"
                                                onClick={() => handleUpgrade(freeTrailMembers.id)}
                                            >
                                                Upgrade Membership
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
                            Free Trial Member is upgraded successfully.
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

FreeTrailMembersTable.propTypes = {
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