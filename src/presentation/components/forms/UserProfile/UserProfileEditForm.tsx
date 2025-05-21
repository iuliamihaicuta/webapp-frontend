import React from "react";
import { FormControl, FormLabel, OutlinedInput, FormHelperText, Button, Stack } from "@mui/material";
import { useUserProfileFormController } from "./UserProfileEditForm.controller";

export const UserProfileForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const { actions, state, computed } = useUserProfileFormController(onSuccess, () => {});

    return (
        <form onSubmit={actions.handleSubmit(actions.submit)}>
            <Stack spacing={3}>
                <FormControl fullWidth error={!!state.errors.name}>
                    <FormLabel required>Name</FormLabel>
                    <OutlinedInput
                        {...actions.register("name")}
                        placeholder="Enter your name"
                    />
                    <FormHelperText>{state.errors.name?.message}</FormHelperText>
                </FormControl>

                <FormControl fullWidth error={!!state.errors.email}>
                    <FormLabel required>Email</FormLabel>
                    <OutlinedInput
                        {...actions.register("email")}
                        placeholder="Enter your email"
                    />
                    <FormHelperText>{state.errors.email?.message}</FormHelperText>
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel>Bio</FormLabel>
                    <OutlinedInput
                        {...actions.register("bio")}
                        placeholder="Enter your bio"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel>Address</FormLabel>
                    <OutlinedInput
                        {...actions.register("address")}
                        placeholder="Enter your address"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel>Phone</FormLabel>
                    <OutlinedInput
                        {...actions.register("phoneNumber")}
                        placeholder="Enter your phone number"
                    />
                </FormControl>

                <Button type="submit" variant="contained" disabled={computed.isSubmitting}>
                    {computed.isSubmitting ? "Saving..." : "Save"}
                </Button>
            </Stack>
        </form>
    );
};