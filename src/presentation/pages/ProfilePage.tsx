import React, { Fragment, useState } from "react";
import { useOwnUser } from "@infrastructure/hooks/useOwnUser";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Seo } from "@presentation/components/ui/Seo";
import { Box } from "@mui/system";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { UserProfileForm } from "@presentation/components/forms/UserProfile/UserProfileEditForm";
import { Button } from "@mui/material";

export const ProfilePage: React.FC = () => {
    const user = useOwnUser();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <Fragment>
            <Seo title="MobyLab Web App | Profile" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <h1>Profile Page</h1>
                        {isEditing ? (
                            <UserProfileForm onSuccess={() => setIsEditing(false)} />
                        ) : (
                            <div>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                                <p><strong>Bio:</strong> {user.profile?.bio}</p>
                                <p><strong>Address:</strong> {user.profile?.address}</p>
                                <p><strong>Birth Date:</strong> {user.profile?.birthDate ? new Date(user.profile.birthDate).toLocaleDateString() : ""}</p>
                                <p><strong>Phone:</strong> {user.profile?.phoneNumber}</p>
                                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            </div>
                        )}
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
};

export default ProfilePage;