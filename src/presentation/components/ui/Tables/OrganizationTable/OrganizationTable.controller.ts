import { useTableController } from "../Table.controller";
import { useGetOrganizations, useDeleteOrganization } from "@infrastructure/apis/api-management";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";

export const useOrganizationTableController = (search: string) => {
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const { data, isError, isLoading, queryKey } = useGetOrganizations(page, pageSize, search);
    const { mutateAsync: deleteOrganization } = useDeleteOrganization();

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]
    );

    const remove = useCallback(
        async (id: string) => {
            await deleteOrganization(id);
            tryReload();
        },
        [deleteOrganization, tryReload]
    );

    const edit = useCallback(
        (id: string) => {
            console.log(`Edit organization with ID: ${id}`);
            // Adaugă logica pentru editare (de exemplu, deschiderea unui dialog sau navigarea către o pagină)
        },
        []
    );

    const tableController = useTableController(setPagination, data?.response?.pageSize);

    return {
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove,
        edit
    };
};