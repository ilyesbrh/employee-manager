import { FunctionComponent, useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableCell, TablePagination, TableRow, TextField, Paper, FormControlLabel, Switch } from '@mui/material';
import { useNavigate } from "react-router-dom";

import "./workerList.scss";
import { Worker, WorkersFilter } from "../../../models/worker";
import { getWorkers } from "../../../services/api.service";

interface WorkersProps {

}

const WorkersList: FunctionComponent<WorkersProps> = () => {

    const [workers, setWorkers] = useState<Worker[]>([]);

    const navigator = useNavigate();

    const [filter, setFilter] = useState<WorkersFilter>({
        firstName: '',
        lastName: '',
        jobTitle: '',
        isArchived: false,
        locationId: '',
        page: 0,
        count: 10
    });

    useEffect(() => {

        getWorkers(filter).then((data) => {
            if (data) {
                setWorkers(data);
            } else {
                setWorkers([]);
            }
        });
    }, [filter]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilter((prevFilter: any) => ({ ...prevFilter, [name]: value, page: 1 }));
    };

    const handleArchivedToggle = () => {
        setFilter((prevFilter) => ({ ...prevFilter, isArchived: !prevFilter.isArchived, page: 1 }));
    };

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setFilter((prevFilter) => ({ ...prevFilter, page }));
    };

    const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const count = parseInt(event.target.value);
        setFilter((prevFilter) => ({ ...prevFilter, count, page: 1 }));
    };

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
        </>
    );
}

export default WorkersList;