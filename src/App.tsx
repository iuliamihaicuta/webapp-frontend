import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { RegisterPage} from "@presentation/pages/RegisterPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { ProfilePage } from "@presentation/pages/ProfilePage";
import { OrganizationsPage } from "@presentation/pages/OrganizationsPage";
import { ProjectsPage } from "@presentation/pages/ProjectsPage";
import { FeedbackPage } from "@presentation/pages/FeedbackPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route path={AppRoute.Organizations} element={<OrganizationsPage />} /> {/* This is a placeholder for the organizations page. */}
        <Route path={AppRoute.Profile} element={<ProfilePage />} /> {/* This is a placeholder for the profile page. */}
        <Route path={AppRoute.Projects} element={<ProjectsPage />} /> {/* This is a placeholder for the projects page. */}
        <Route path={AppRoute.Feedback} element={<FeedbackPage />} /> {/* This is a placeholder for the feedback page. */}
        {/* The following routes are only available to admin users. */}
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />}
      </Routes>
    </AppIntlProvider>
}
