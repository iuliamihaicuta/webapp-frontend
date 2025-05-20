import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCallback } from "react";
import { UserProfileFormModel, UserProfileFormController } from "./UserProfileEditForm.types";
import { useOwnUser } from "@infrastructure/hooks/useOwnUser";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    bio: yup.string(),
    address: yup.string(),
    phoneNumber: yup.string(),
});

export const useUserProfileFormController = (onSuccess: () => void): UserProfileFormController => {
    const user = useOwnUser();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<UserProfileFormModel>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            bio: user?.profile?.bio || "",
            address: user?.profile?.address || "",
            phoneNumber: user?.profile?.phoneNumber || "",
        },
    });

    const submit = useCallback((data: UserProfileFormModel) => {
        console.log("Form submitted:", data);
        // Add API call logic here
        onSuccess(); // Call the callback to exit edit mode
    }, [onSuccess]);

    return {
        actions: { register, handleSubmit, submit },
        state: { errors },
        computed: { isSubmitting: false }, // Replace with actual submission state if needed
    };
};