import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    OutlinedInput,
    Stack,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useProjectAddFormController } from "./ProjectAddForm.controller";
import { isEmpty, isUndefined } from "lodash";

const fieldNameMap: Record<string, string> = {
    title: "globals.title",
    description: "globals.description",
    location: "globals.location",
    startDate: "globals.startDate",
    endDate: "globals.endDate",
    organizationId: "globals.organizationId",
};

export const ProjectAddForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useProjectAddFormController(props.onSubmit);

    return (
        <form onSubmit={actions.handleSubmit(actions.submit)}>
            <Stack spacing={4} style={{ width: "100%" }}>
                <div className="grid grid-cols-2 gap-y-5 gap-x-5">
                    <div className="col-span-1">
                         <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.title)}
                         >
                            <FormLabel required>
                                <FormattedMessage id={fieldNameMap.title} />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("title")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.title",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.title)}
                            >
                                {state.errors.title?.message}
                            </FormHelperText>
                         </FormControl>
                    </div>
                    <div className="col-span-1">
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.description)}
                        >
                            <FormLabel required>
                                <FormattedMessage id={fieldNameMap.description} />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("description")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.description",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.description)}
                            >
                                {state.errors.description?.message}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <div className="col-span-1">
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.location)}
                        >
                            <FormLabel required>
                                <FormattedMessage id={fieldNameMap.location} />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("location")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.location",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.location)}
                            >
                                {state.errors.location?.message}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <div className="col-span-1">
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.startDate)}
                        >
                            <FormLabel required>
                                <FormattedMessage id={fieldNameMap.startDate} />
                            </FormLabel>
                            <OutlinedInput
                                type="date"
                                {...actions.register("startDate")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.startDate",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.startDate)}
                            >
                                {state.errors.startDate?.message}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <div className="col-span-1">
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.endDate)}
                        >
                            <FormLabel required>
                                <FormattedMessage id={fieldNameMap.endDate} />
                            </FormLabel>
                            <OutlinedInput
                                type="date"
                                {...actions.register("endDate")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.endDate",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.endDate)}
                            >
                                {state.errors.endDate?.message}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <div className="col-span-1">
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.organizationId)}
                        >
                            <FormLabel required>
                                <FormattedMessage id={fieldNameMap.organizationId} />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("organizationId")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.organizationId",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.organizationId)}
                            >
                                {state.errors.organizationId?.message}
                            </FormHelperText>
                        </FormControl>
                    </div>
                    <Button className="-col-end-1 col-span-1" type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                        {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                        {computed.isSubmitting && <CircularProgress />}
                    </Button>
                </div>
            </Stack>
        </form>
    );
};
