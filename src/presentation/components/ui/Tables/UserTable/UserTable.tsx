import { useState } from "react";
import { TextField, IconButton, TablePagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { useUserTableController } from "./UserTable.controller";
import { UserDTO } from "@infrastructure/apis/client";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserAddDialog } from "../../Dialogs/UserAddDialog";
import { useAppSelector } from "@application/store";
import { DataTable } from "@presentation/components/ui/Tables/DataTable";

const useHeader = (): { key: keyof UserDTO, name: string, order: number }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }), order: 1 },
        { key: "email", name: formatMessage({ id: "globals.email" }), order: 2 },
        { key: "role", name: formatMessage({ id: "globals.role" }), order: 3 },
    ];
};

const getRowValues = (entries: UserDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(entry => ({
        entry: entry,
        data: Object.entries(entry)
            .filter(([e]) => !isUndefined(orderMap[e]))
            .sort(([a], [b]) => orderMap[a] - orderMap[b])
            .map(([key, value]) => ({ key, value }))
    }));

export const UserTable = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { formatMessage } = useIntl();
    const header = useHeader();
    const [search, setSearch] = useState(""); // Add search state
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove } = useUserTableController(search); // Pass search to the controller

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value); // Update search state
        tryReload(); // Reload data with the new search term
    };

    return (
        <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
            {/*<UserAddDialog />*/}
            {/*<div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>*/}
            {/*    <TextField*/}
            {/*        label={formatMessage({ id: "labels.search" })}*/}
            {/*        variant="outlined"*/}
            {/*        size="small"*/}
            {/*        value={search}*/}
            {/*        onChange={handleSearchChange}*/}
            {/*        style={{ marginRight: "1rem" }}*/}
            {/*    />*/}
            {/*    <IconButton onClick={tryReload}>*/}
            {/*        <SearchIcon />*/}
            {/*    </IconButton>*/}
            {/*</div>*/}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <UserAddDialog />
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        label={formatMessage({ id: "labels.search" })}
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={handleSearchChange}
                        style={{ marginRight: "1rem" }}
                    />
                    <IconButton onClick={tryReload}>
                        <SearchIcon />
                    </IconButton>
                </div>
            </div>
            {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
                <TablePagination
                    component="div"
                    count={pagedData.totalCount}
                    page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0}
                    onPageChange={handleChangePage}
                    rowsPerPage={pagedData.pageSize}
                    onRowsPerPageChange={handleChangePageSize}
                    labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                    labelDisplayedRows={labelDisplay}
                    showFirstButton
                    showLastButton
                />}
            <DataTable
                data={pagedData?.data ?? []}
                header={header}
                extraHeader={[{
                    key: "actions",
                    name: formatMessage({ id: "labels.actions" }),
                    render: entry => <>
                        {entry.id !== ownUserId && <IconButton color="error" onClick={() => remove(entry.id || '')}>
                            <DeleteIcon color="error" fontSize='small' />
                        </IconButton>}
                    </>,
                    order: 4
                }]}
            />
        </DataLoadingContainer>
    );
};