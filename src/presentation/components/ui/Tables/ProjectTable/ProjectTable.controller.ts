import { useTableController } from "../Table.controller";
import { useGetProjects, useDeleteProject } from "@infrastructure/apis/api-management";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";

export const useProjectTableController = (search: string) => {
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const { data, isError, isLoading, queryKey } = useGetProjects(page, pageSize, search);
    const { mutateAsync: remove } = useDeleteProject(); // idem, dacă ai DELETE

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
