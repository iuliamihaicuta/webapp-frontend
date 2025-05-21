import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCallback } from "react";
import { UserProfileFormModel, UserProfileFormController } from "./UserProfileEditForm.types";
import { useOwnUser } from "@infrastructure/hooks/useOwnUser";
import { useUpdateUser } from "@infrastructure/apis/api-management";

const schema = yup.object().shape({
    id: yup.string().required("ID is required"),
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    bio: yup.string(),
    address: yup.string(),
    phoneNumber: yup.string(),
});

export const useUserProfileFormController = (onSuccess: () => void, refreshUser: () => void): UserProfileFormController => {
    const user = useOwnUser();

    const { mutateAsync: updateUser} = useUpdateUser();

    const form = useForm<UserProfileFormModel>({
        resolver: yupResolver(schema),
        defaultValues: {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            bio: user?.profile?.bio || "",
            address: user?.profile?.address || "",
            phoneNumber: user?.profile?.phoneNumber || "",
        },
    });

    const handleSubmit = form.handleSubmit;

    const submit = useCallback(async (data: UserProfileFormModel) => {
        try {
            await updateUser(data);
            onSuccess();
            refreshUser();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }, [updateUser, onSuccess, refreshUser]);

    return {
        actions: {
            register: form.register,
            handleSubmit,
            submit,
        },
        state: {
            errors: form.formState.errors,
        },
        computed: {
            isSubmitting: form.formState.isSubmitting,
        },
    };
};