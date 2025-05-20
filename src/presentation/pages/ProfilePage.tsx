import React, { Fragment } from "react";
import { useOwnUser } from "@infrastructure/hooks/useOwnUser";
import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Seo } from "@presentation/components/ui/Seo";
import { Box } from "@mui/system";
import { ContentCard } from "@presentation/components/ui/ContentCard";

export const ProfilePage: React.FC = () => {
    const user = useOwnUser(); // Obține datele utilizatorului curent.

    if (!user) {
        return <p>Loading user data...</p>; // Afișează un loader dacă datele nu sunt încă disponibile.
    }

    return (
        <Fragment>
            <Seo title="MobyLab Web App | Profile" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <h1>Profile Page</h1>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Bio:</strong> {user.profile?.bio}</p>
                        <p><strong>Address:</strong> {user.profile?.address}</p>
                        <p><strong>Birth Date:</strong> {user.profile?.birthDate ? new Date(user.profile.birthDate).toLocaleDateString() : ""}</p>
                        <p><strong>Phone:</strong> {user.profile?.phoneNumber}</p>
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    );
};

export default ProfilePage;