import { useIntl } from "react-intl";
import { IconButton, TablePagination, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { DataTable } from "../DataTable";
import { useOrganizationTableController } from "./OrganizationTable.controller";
import { OrganizationAddDialog } from "@presentation/components/ui/Dialogs/OrganizationAddDialog";
import SearchIcon from "@mui/icons-material/Search";
import {DeleteDialog} from "@presentation/components/ui/Dialogs/DeleteDialog";

const useHeader = () => {
    const { formatMessage } = useIntl();

    return [
        { key: "id" as const, name: formatMessage({ id: "globals.id" }), order: 1 },
        { key: "name" as const, name: formatMessage({ id: "globals.name" }), order: 2 },
    ];
};

export const OrganizationTable = () => {
    const { formatMessage } = useIntl();
    const header = useHeader();
    const [search, setSearch] = useState("");
    const {
        handleChangePage,
        handleChangePageSize,
        pagedData,
        isError,
        isLoading,
        tryReload,
        labelDisplay,
        remove,
        edit,
    } = useOrganizationTableController(search);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        tryReload();
    };

    return (
        <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <OrganizationAddDialog />
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
            {!pagedData?.totalCount && pagedData?.pageSize && (
                <TablePagination
                    component="div"
                    count={pagedData.totalCount}
                    page={pagedData.page - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={pagedData.pageSize}
                    onRowsPerPageChange={handleChangePageSize}
                    labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                    labelDisplayedRows={labelDisplay}
                    showFirstButton
                    showLastButton
                />
            )}
            <DataTable
                data={pagedData?.data ?? []}
                header={header}
                extraHeader={[
                    {
                        key: "actions",
                        name: formatMessage({ id: "labels.actions" }),
                        render: (entry) => (
                            <>
                                <IconButton color="primary" onClick={() => edit(entry.id || "")}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                {/*<IconButton color="error" onClick={() => remove(entry.id || "")}>*/}
                                {/*    <DeleteIcon fontSize="small" />*/}
                                {/*</IconButton>*/}
                                <DeleteDialog
                                    trigger={
                                        <IconButton color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    }
                                    onConfirm={() => {
                                        remove(entry.id || '').then(() => {
                                            tryReload();
                                        });
                                    }}
                                />
                            </>
                        ),
                        order: 3,
                    },
                ]}
            />
        </DataLoadingContainer>
    );
};