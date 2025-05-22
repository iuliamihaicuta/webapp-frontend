import { useAppSelector } from "@application/store";
import {
    Configuration,
    OrganizationApi,
    OrganizationAddDTO,
    OrganizationUpdateDTO
} from "../client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";

const getOrganizationsQueryKey = "getOrganizationsQuery";
const getOrganizationQueryKey = "getOrganizationQuery";
const addOrganizationMutationKey = "addOrganizationMutation";
const deleteOrganizationMutationKey = "deleteOrganizationMutation";

const getFactory = (token: string | null) => new OrganizationApi(new Configuration({ accessToken: token ?? "" }));

export const useGetOrganizations = (page: number, pageSize: number, search: string = "") => {
    const { token } = useAppSelector(x => x.profileReducer);

    return {
        ...useQuery({
            queryKey: [getOrganizationsQueryKey, token, page, pageSize, search],
            queryFn: async () => await getFactory(token).apiOrganizationGetPageGet({ page, pageSize, search }),
            refetchInterval: Infinity,
            refetchOnWindowFocus: false
        }),
        queryKey: getOrganizationsQueryKey
    };
}

export const useGetOrganization = (id: string | null) => {
    const { token } = useAppSelector(x => x.profileReducer);

    return {
        ...useQuery({
            queryKey: [getOrganizationQueryKey, token, id],
            queryFn: async () => await getFactory(token).apiOrganizationGetByIdIdGet({ id: id ?? "" }),
            refetchInterval: Infinity,
            refetchOnWindowFocus: false,
            enabled: !isEmpty(id)
        }),
        queryKey: getOrganizationQueryKey
    };
}

export const useAddOrganization = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addOrganizationMutationKey, token],
        mutationFn: async (organizationAddDTO: OrganizationAddDTO) => {
            const result = await getFactory(token).apiOrganizationAddPost({ organizationAddDTO });
            await queryClient.invalidateQueries({ queryKey: [getOrganizationsQueryKey] });
            await queryClient.invalidateQueries({ queryKey: [getOrganizationQueryKey] });
            return result;
        }
    });
}

export const useDeleteOrganization = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [deleteOrganizationMutationKey, token],
        mutationFn: async (id: string) => {
            const result = await getFactory(token).apiOrganizationDeleteIdDelete({ id });
            await queryClient.invalidateQueries({ queryKey: [getOrganizationsQueryKey] });
            await queryClient.invalidateQueries({ queryKey: [getOrganizationQueryKey] });
            return result;
        }
    });
}

export const useUpdateOrganization = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [addOrganizationMutationKey, token],
        mutationFn: async (organizationUpdateDTO: OrganizationUpdateDTO) => {
            const result = await getFactory(token).apiOrganizationUpdatePut({ organizationUpdateDTO });
            await queryClient.invalidateQueries({ queryKey: [getOrganizationsQueryKey] });
            await queryClient.invalidateQueries({ queryKey: [getOrganizationQueryKey] });
            return result;
        }
    });
}
