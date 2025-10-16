import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[];
    editMode: boolean;
    selectedActivity?: Activity;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
}

export default function ActivityDashboard({
    activities,
    editMode,
    selectedActivity,
    cancelSelectActivity,
    selectActivity,
    openForm,
    closeForm,
}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                />
            </Grid>
            <Grid size={5}>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetail
                        selectedActivity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />
                }
                {
                    editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                    />
                }
            </Grid>
        </Grid>
    )
}
