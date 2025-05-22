import { useTableController } from "../Table.controller";
import { useGetUsers, useDeleteUser } from "@infrastructure/apis/api-management";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useUserTableController = (search: string) => {
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const { data, isError, isLoading, queryKey } = useGetUsers(page, pageSize, search); // Pass search to the query hook
    const { mutateAsync: remove } = useDeleteUser();

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]
    );

    const tableController = useTableController(setPagination, data?.response?.pageSize);

    return {
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove
    };
};