import { useAppSelector } from "@application/store";
import {
    Configuration,
    ProjectApi,
    ProjectAddDTO,
    ProjectUpdateDTO
} from "../client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";

/**
 * Constants to identify queries and mutations
 */
const getProjectsQueryKey = "getProjectsQuery";
const getProjectQueryKey = "getProjectQuery";
const addProjectMutationKey = "addProjectMutation";
const updateProjectMutationKey = "updateProjectMutation";
const deleteProjectMutationKey = "deleteProjectMutation";

const getFactory = (token: string | null) =>
    new ProjectApi(new Configuration({ accessToken: token ?? "" }));

/**
 * Fetch list of projects
 */
export const useGetProjects = (page: number, pageSize: number, search: string = "") => {
    const { token } = useAppSelector((x) => x.profileReducer);

    return {
        ...useQuery({
            queryKey: [getProjectsQueryKey, token, page, pageSize, search],
            queryFn: async () =>
                await getFactory(token).apiProjectGetPageGet({ page, pageSize, search }),
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
        }),
        queryKey: getProjectsQueryKey,
    };
};

/**
 * Fetch a single project by ID
 */
export const useGetProject = (id: string | null) => {
    const { token } = useAppSelector((x) => x.profileReducer);

    return {
        ...useQuery({
            queryKey: [getProjectQueryKey, token, id],
            queryFn: async () =>
                await getFactory(token).apiProjectGetByIdIdGet({ id: id ?? "" }),
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
            enabled: !isEmpty(id),
        }),
        queryKey: getProjectQueryKey,
    };
};

/**
 * Add a new project
 */
export const useAddProject = () => {
    const { token } = useAppSelector((x) => x.profileReducer);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addProjectMutationKey, token],
        mutationFn: async (projectAddDTO: ProjectAddDTO) => {
            const result = await getFactory(token).apiProjectAddPost({ projectAddDTO });
            await queryClient.invalidateQueries({ queryKey: [getProjectsQueryKey] });
            await queryClient.invalidateQueries({ queryKey: [getProjectQueryKey] });

            return result;
        },
    });
};

/**
 * Update an existing project
 */
export const useUpdateProject = () => {
    const { token } = useAppSelector((x) => x.profileReducer);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [updateProjectMutationKey, token],
        mutationFn: async (projectUpdateDTO: ProjectUpdateDTO) => {
            const result = await getFactory(token).apiProjectUpdatePut({ projectUpdateDTO });
            await queryClient.invalidateQueries({ queryKey: [getProjectsQueryKey] });
            await queryClient.invalidateQueries({ queryKey: [getProjectQueryKey] });

            return result;
        },
    });
};

/**
 * Delete a project
 */
export const useDeleteProject = () => {
    const { token } = useAppSelector((x) => x.profileReducer);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [deleteProjectMutationKey, token],
        mutationFn: async (id: string) => {
            const result = await getFactory(token).apiProjectDeleteIdDelete({ id });
            await queryClient.invalidateQueries({ queryKey: [getProjectsQueryKey] });
            await queryClient.invalidateQueries({ queryKey: [getProjectQueryKey] });

            return result;
        },
    });
};
