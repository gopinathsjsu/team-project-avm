import { useCallback, useMemo, useState, useEffect } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { FreeTrailMembersTable } from './FreeTrialMembersTable';
import { applyPagination } from './apply-pagination';
import PropTypes from 'prop-types';
import * as API from '../../actions/API.js';


const FreeTrailMembers = (props) => {

    const gymId = props;
    const membersUpdated = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [upgradeClicked, setUpgradeClicked] = useState(false);

    const [freeTrailMembers, setFreeTrailMembers] = useState([]);

    useEffect(() => {        
        //make an API call!               
        API.getFreeTrailMembers()
            .then(response => {          
                console.log('Free Trail==>',response.data)      
                setFreeTrailMembers(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [upgradeClicked])

    const handleUpgradeClick = () => {
        // from child component - FreeTrailMembersTable
        setUpgradeClicked(!upgradeClicked)
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
                                    Free Trial Members
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                </Stack>
                            </Stack>
                        </Stack>
                        <FreeTrailMembersTable
                            count={freeTrailMembers.length}
                            items={freeTrailMembers}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onUpgradeClick={handleUpgradeClick}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default FreeTrailMembers;

FreeTrailMembers.propTypes = {
    gymId: PropTypes.string, //number
};