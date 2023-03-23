import { FunctionComponent, useEffect } from "react";
import { Button, TextField, Grid, Paper } from "@mui/material";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./workerEditView.scss";
import { createWorker, getWorker, updateWorker } from "../../../services/api.service";
import { mapWorkerToWorkerForm } from "../../../services/mapper.service";
import { enqueueSnackbar } from "notistack";
import UploadAvatar from "../../components/imageUploader";
import { selectCurrentWorker, selectWorkerForm, updateCurrentWorker, updateWorkerForm } from "../../../store/workers";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";


const WorkerEditView: FunctionComponent<any> = () => {

    // Get the navigation function and dispatcher from the store
    const navigator = useNavigate();
    const dispatcher = useAppDispatch();

    // Get the worker ID from the URL
    const { id } = useParams();

    // Get the current worker and worker form from the store
    const worker = useAppSelector(selectCurrentWorker);
    const workerForm = useAppSelector(selectWorkerForm);

    // Set the worker form when the worker changes
    useEffect(() => {
        if (!worker) return;
        // set worker form object when worker changes
        dispatcher(updateWorkerForm(mapWorkerToWorkerForm(worker)));
    }, [dispatcher, worker]);

    /* Lifecycle hooks */

    // Did mount hook
    useEffect(() => {

        if (!id) return;

        // Load the worker data when the component mounts
        getWorker(id).then(worker => worker ? dispatcher(updateCurrentWorker(worker)) : null);

    }, [dispatcher, id]);

    /* Actions Handlers */

    // Handle changes to the worker form inputs
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;

        dispatcher(updateWorkerForm({ ...workerForm, [name]: value }));
    };

    // Handle changes to the "date hired" input
    const handleDateHiredChange = (date: any) => {

        dispatcher(updateWorkerForm({
            ...workerForm,
            DateHired: date.toISOString(),
        }));

    };

    // Handle clicking the "cancel" button
    const handelCancelClick = (event: any) => {
        navigator('../');
    };

    // Handle clicking the "update" or "create" button
    const handelUpdateClick = async (event: any) => {
        event.preventDefault();

        try {
            if (id) {
                // Update an existing worker
                await updateWorker(id, workerForm);
                enqueueSnackbar('Worker updated successfully', {
                    variant: 'success',
                });
            } else {
                // Create a new worker
                await createWorker(workerForm);
                enqueueSnackbar('Worker created successfully', {
                    variant: 'success',
                });
            }


            navigator('../');
        } catch (error) {
            console.error('Error updating or creating worker:', error);
        }
    };


    return (
        <Paper className="container p-4 my-2">
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <UploadAvatar workerId={id} ></UploadAvatar>
                    </Grid>
                    <Grid item xs={12}>
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="FirstName"
                            name="FirstName"
                            label="First Name"
                            variant="outlined"
                            value={workerForm.FirstName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="LastName"
                            name="LastName"
                            label="Last Name"
                            variant="outlined"
                            value={workerForm.LastName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="JobTitle"
                            name="JobTitle"
                            label="Job Title"
                            variant="outlined"
                            value={workerForm.JobTitle}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="Position"
                            name="Position"
                            label="Position"
                            variant="outlined"
                            value={workerForm.Position}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DatePicker className="w-100"
                            label="Date Hired"
                            value={dayjs(workerForm.DateHired)}
                            onChange={handleDateHiredChange}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <h6 className="mt-3 mb-2 text-primary">Contacts</h6>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="MobileNumber"
                            name="MobileNumber"
                            label="Mobile Number"
                            variant="outlined"
                            value={workerForm.MobileNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="PhoneNumber"
                            name="PhoneNumber"
                            label="Phone Number"
                            variant="outlined"
                            value={workerForm.PhoneNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="EmployeeNumber"
                            name="EmployeeNumber"
                            label="Employee Number"
                            variant="outlined"
                            value={workerForm.EmployeeNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="EmergencyContact1"
                            name="EmergencyContact1"
                            label="Emergency Contact"
                            variant="outlined"
                            value={workerForm.EmergencyContact1}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="EmergencyContact2"
                            name="EmergencyContact2"
                            label="Alternative Emergency Contact"
                            variant="outlined"
                            value={workerForm.EmergencyContact2}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="EmergencyNotes"
                            name="EmergencyNotes"
                            label="Emergency Notes"
                            variant="outlined"
                            value={workerForm.EmergencyNotes}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="StreetAddress"
                            name="StreetAddress"
                            label="Street Address"
                            variant="outlined"
                            value={workerForm.StreetAddress}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="City"
                            name="City"
                            label="City"
                            variant="outlined"
                            value={workerForm.City}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="PostalCode"
                            name="PostalCode"
                            label="Postal Code"
                            variant="outlined"
                            value={workerForm.PostalCode}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div >
                            <Button variant="outlined" color="secondary" onClick={handelCancelClick} >
                                Cancel
                            </Button>
                            {
                                id
                                    ? <Button variant="contained" color="warning" className="mx-3" onClick={handelUpdateClick}>
                                        Update
                                    </Button>
                                    : <Button variant="contained" color="primary" className="mx-3" onClick={handelUpdateClick}>
                                        Create
                                    </Button>
                            }
                        </div>
                    </Grid>
                </Grid>
            </form>

        </Paper>
    )
}

export default WorkerEditView;