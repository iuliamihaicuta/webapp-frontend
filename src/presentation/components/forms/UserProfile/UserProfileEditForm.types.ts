export interface UserProfileFormModel {
    id: string;
    name: string;
    email: string;
    bio?: string;
    address?: string;
    phoneNumber?: string;
}

export interface UserProfileFormController {
    actions: {
        register: any;
        handleSubmit: any;
        submit: (data: UserProfileFormModel) => void;
    };
    state: {
        errors: Record<string, any>;
    };
    computed: {
        isSubmitting: boolean;
    };
}