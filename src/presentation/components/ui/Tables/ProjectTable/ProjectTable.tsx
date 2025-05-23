import { useState } from "react";
import { TextField, IconButton, TablePagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useIntl } from "react-intl";
import { isUndefined } from "lodash";
import { useProjectTableController } from "./ProjectTable.controller";
import { ProjectDTO } from "@infrastructure/apis/client";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { DataTable } from "@presentation/components/ui/Tables/DataTable";
import { ProjectAddDialog } from "../../Dialogs/ProjectAddDialog";
import {DeleteDialog} from "@presentation/components/ui/Dialogs/DeleteDialog";

const useHeader = (): { key: keyof ProjectDTO, name: string, order: number }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "title", name: formatMessage({ id: "project.title" }), order: 1 },
        { key: "location", name: formatMessage({ id: "project.location" }), order: 2 },
        { key: "startDate", name: formatMessage({ id: "project.startDate" }), order: 3 },
        { key: "endDate", name: formatMessage({ id: "project.endDate" }), order: 4 },
    ];
};

export const ProjectTable = () => {
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
        remove
    } = useProjectTableController(search);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        tryReload();
    };

    return (
        <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <ProjectAddDialog />
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
                    render: entry => (
                        // <IconButton color="error" onClick={() => remove(entry.id || '')}>
                        //     <DeleteIcon fontSize="small" />
                        // </IconButton>
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
                    ),
                    order: 5
                }]}
            />
        </DataLoadingContainer>
    );
};
