import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    OutlinedInput,
    Select,
    MenuItem
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserEditFormController } from "./UserEditForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { UserDTO, UserRoleEnum } from "@infrastructure/apis/client";

export const UserEditForm = (props: { user: UserDTO, onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useUserEditFormController(props.user, props.onSubmit);

    return <form onSubmit={actions.handleSubmit(actions.submit)}>
        <Stack spacing={4} style={{ width: "100%" }}>
            <div className="grid grid-cols-2 gap-y-5 gap-x-5">
                <div className="col-span-1">
                    <FormControl fullWidth error={!isUndefined(state.errors.name)}>
                        <FormLabel required>
                            <FormattedMessage id="globals.name" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("name")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                { fieldName: formatMessage({ id: "globals.name" }) }
                            )}
                            autoComplete="none"
                        />
                        <FormHelperText hidden={isUndefined(state.errors.name)}>
                            {state.errors.name?.message}
                        </FormHelperText>
                    </FormControl>
                </div>

                <div className="col-span-1">
                    <FormControl fullWidth error={!isUndefined(state.errors.email)}>
                        <FormLabel required>
                            <FormattedMessage id="globals.email" />
                        </FormLabel>
                        <OutlinedInput
                            {...actions.register("email")}
                            placeholder={formatMessage(
                                { id: "globals.placeholders.textInput" },
                                { fieldName: formatMessage({ id: "globals.email" }) }
                            )}
                            autoComplete="none"
                        />
                        <FormHelperText hidden={isUndefined(state.errors.email)}>
                            {state.errors.email?.message}
                        </FormHelperText>
                    </FormControl>
                </div>

                <div className="col-span-1">
                    <FormControl fullWidth error={!isUndefined(state.errors.role)}>
                        <FormLabel required>
                            <FormattedMessage id="globals.role" />
                        </FormLabel>
                        <Select
                            {...actions.register("role")}
                            value={actions.watch("role")}
                            onChange={actions.selectRole}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                <span className="text-gray">
                                    {formatMessage(
                                        { id: "globals.placeholders.selectInput" },
                                        { fieldName: formatMessage({ id: "globals.role" }) }
                                    )}
                                </span>
                            </MenuItem>
                            <MenuItem value={UserRoleEnum.Client}>
                                <FormattedMessage id="globals.client" />
                            </MenuItem>
                            <MenuItem value={UserRoleEnum.Admin}>
                                <FormattedMessage id="globals.admin" />
                            </MenuItem>
                        </Select>
                        <FormHelperText hidden={isUndefined(state.errors.role)}>
                            {state.errors.role?.message}
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
};
