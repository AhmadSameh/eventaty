import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Activity[]>("/api/activities")
            .then((response => setActivities(response.data)));

        return () => { }
    }, []);

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(activity => activity.id === id));
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
        if(activity.id) {
            setActivities(activities.map(_activity => _activity.id === activity.id ? activity : _activity));
        } else {
            const newActivity = {...activity, id: activities.length.toString()};
            setActivities([...activities, newActivity]);
        }
        setEditMode(false);
    }

    const handleDelete = (id: string) => {
        setActivities(activities.filter(activity => activity.id !== id));
    }

    return (
        <Box sx={{ bgcolor: '#eeeeee' }}>
            <CssBaseline />
            <NavBar openForm={handleOpenForm} />
            <Container maxWidth='xl' sx={{ mt: 3 }}>
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
            </Container>
        </Box>
    );
}

export default App;
