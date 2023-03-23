import { FunctionComponent, useEffect } from "react";
import { Table, TableHead, TableBody, TableCell, TablePagination, TableRow, TextField, Paper, FormControlLabel, Switch, Fab } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

import "./workerList.scss";
import { Worker } from "../../../models/worker";
import { getWorkers } from "../../../services/api.service";
import AddIcon from '@mui/icons-material/Add';
import { selectWorkers, selectWorkersFilter, updateWorkerFilter, updateWorkers } from "../../../store/workers";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface WorkersProps { }

// Define the component
const WorkersList: FunctionComponent<WorkersProps> = () => {
    // Get the navigation function and dispatcher from the store
    const navigator = useNavigate();
    const dispatcher = useAppDispatch();

    // Get the workers and filters from the store
    const workers = useAppSelector(selectWorkers);
    const filter = useAppSelector(selectWorkersFilter);

    // Load the workers when the component mounts or when the filter changes
    useEffect(() => {

        getWorkers(filter).then((data: Array<Worker> | undefined) => {
            if (data) {
                dispatcher(updateWorkers(data));
            }
        });
    }, [dispatcher, filter]);

    // Handle changes to the filter inputs
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        dispatcher(updateWorkerFilter({ ...filter, [name]: value, page: 0 }));
    };

    // Handle toggling the "archived" filter
    const handleArchivedToggle = () => {
        dispatcher(updateWorkerFilter({ ...filter, isArchived: !filter.isArchived, page: 0 }));
    };

    // Handle changing the page number
    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        dispatcher(updateWorkerFilter({ ...filter, page }));
    };

    // Handle changing the number of rows per page
    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value);
        dispatcher(updateWorkerFilter({ ...filter, count, page: 1 }));
    };

    // Handle clicking on a row
    const handleRowClick = (Id: string) => {
        navigator('/workers/' + Id);
    }

    return (
        <>
            <div className="main-container d-flex m-4">
                <Paper elevation={3} className="filters-container d-flex flex-column align-items-stretch gap-4 p-5">
                    <h1>Filter</h1>
                    <TextField
                        label="First name"
                        name="firstName"
                        value={filter.firstName}
                        onChange={handleFilterChange}
                    />
                    <TextField label="Last name" name="lastName" value={filter.lastName} onChange={handleFilterChange} />
                    <TextField label="Job title" name="jobTitle" value={filter.jobTitle} onChange={handleFilterChange} />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={filter.isArchived}
                                onChange={handleArchivedToggle}
                                color="primary"
                            />
                        }
                        label={filter.isArchived ? 'Show active' : 'Show archived'}
                    />
                </Paper>

                <Paper elevation={3} className="d-flex flex-column justify-content-between">
                    <Table className="w-100">
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Job title</TableCell>
                                <TableCell>City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No rows available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                workers.map((worker) => (
                                    <TableRow hover key={worker.Id} onClick={() => handleRowClick(worker.Id)} className="table-row">
                                        <TableCell>{worker.FirstName}</TableCell>
                                        <TableCell>{worker.LastName}</TableCell>
                                        <TableCell>{worker.JobTitle}</TableCell>
                                        <TableCell>{worker.City}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30]}
                        component="div"
                        count={999}
                        rowsPerPage={filter.count}
                        page={filter.page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleCountChange}
                    />
                </Paper>
            </div>
            <Link to="/workers/edit">
                <Fab color="primary" aria-label="add" className="add-fab" >
                    <AddIcon />
                </Fab>
            </Link>
        </>
    );
}

export default WorkersList;