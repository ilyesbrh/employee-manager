import { FunctionComponent, useEffect, useState } from "react";
import { Button, TextField, Grid, Paper } from "@mui/material";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./workerEditView.scss";
import { createWorker, getWorker, updateWorker } from "../../../services/api.service";
import { Worker, WorkerForm } from "../../../models/worker";
import { mapWorkerToWorkerForm } from "../../../services/mapper.service";
import { enqueueSnackbar } from "notistack";
import UploadAvatar from "../../components/imageUploader";


const WorkerEditView: FunctionComponent<any> = () => {

    const navigator = useNavigate();

    // Worker params
    const { id } = useParams();

    // Worker object
    const [worker, setWorker] = useState<Worker | null>(null);

    // worker changed
    useEffect(() => {
        if (!worker) return;

        // set worker form object when worker changes
        setWorkerForm(mapWorkerToWorkerForm(worker));

    }, [worker]);

    // Worker form state
    const [workerForm, setWorkerForm] = useState<WorkerForm>({
        FirstName: "",
        LastName: "",
        JobTitle: "",
        StreetAddress: "",
        City: "",
        PostalCode: "",
        MobileNumber: "",
        PhoneNumber: "",
        DateHired: dayjs(Date.now()),
        Position: "",
        EmployeeNumber: "",
        EmergencyContact1: "",
        EmergencyContact2: "",
        EmergencyNotes: "",
    });

    useEffect(() => {

        // worker form changed
    }, [workerForm]);


    /* Lifecycle hooks */

    // Did mount hook
    useEffect(() => {

        if (!id) return;

        // load worker data
        getWorker(id).then(worker => worker ? setWorker(worker) : null);

    }, [id]);

    /* Actions Handlers */
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setWorkerForm({ ...workerForm, [name]: value });
    };

    const handleDateHiredChange = (date: any) => {
        setWorkerForm({
            ...workerForm,
            DateHired: date,
        });
    };

    const handelCancelClick = (event: any) => {
        navigator('../');
    };

    const handelUpdateClick = async (event: any) => {
        event.preventDefault();

        try {
            if (id) {
                // Update worker
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
                            value={workerForm.DateHired}
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