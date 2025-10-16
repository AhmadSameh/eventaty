import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useQuery } from "@tanstack/react-query";

function App() {
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const respnose = await axios.get<Activity[]>("http://localhost:5001/api/activities");
            return respnose.data;
        }
    });

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities!.find(activity => activity.id === id));
    }

    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }

    const handleOpenForm = (id?: string) => {
        if (id) handleSelectActivity(id);
        else handleCancelSelectActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }

    const handleSubmitForm = (activity: Activity) => {
        // if (activity.id) {
        //     setActivities(activities.map(_activity => _activity.id === activity.id ? activity : _activity));
        // } else {
        //     const newActivity = { ...activity, id: activities.length.toString() };
        //     setActivities([...activities, newActivity]);
        // }
        console.log(activity);
        setEditMode(false);
    }

    const handleDelete = (id: string) => {
        // setActivities(activities.filter(activity => activity.id !== id));
        console.log(id);
    }

    return (
        <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
            <CssBaseline />
            <NavBar openForm={handleOpenForm} />
            <Container maxWidth='xl' sx={{ mt: 3 }}>
                {!activities || isPending ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <ActivityDashboard
                        activities={activities}
                        selectActivity={handleSelectActivity}
                        cancelSelectActivity={handleCancelSelectActivity}
                        selectedActivity={selectedActivity}
                        editMode={editMode}
                        openForm={handleOpenForm}
                        closeForm={handleFormClose}
                        submitForm={handleSubmitForm}
                        deleteActivity={handleDelete}
                    />
                )}
            </Container>
        </Box>
    );
}

export default App;
