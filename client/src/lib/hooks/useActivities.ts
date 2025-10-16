import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {
    const queryClient = useQueryClient();
    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const respnose = await agent.get<Activity[]>('activities');
            return respnose.data;
        }
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            });
        }
    })

    return {
        activities,
        isPending,
        updateActivity
    };
}