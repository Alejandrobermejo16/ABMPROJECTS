import React from "react";
import NewInitialDashboardFilter from "../components/NewInitialDashboard/NewInitialDashboardFilter";
import NewInitialDashboardPresentation from "../components/NewInitialDashboard/NewInitialDashboardPresentation";
import NewInitialDashboardProjects from "../components/NewInitialDashboard/NewInitialDashboardProjects";
import NewInitialDashboardTechnologies from "../components/NewInitialDashboard/NewInitialDashboardTechnologies";
import NewInitialDashboardContact from "../components/NewInitialDashboard/NewInitialDashboardContact";
import NewInitialDashboardIntroduction from "../components/NewInitialDashboard/NewInitialDashboardIntroduction";

const NewInitialDashboard = () => {

  return (
    <div className="NewInitialDashBoard">
     <NewInitialDashboardFilter/>
      <NewInitialDashboardProjects/>
      <NewInitialDashboardIntroduction/>
      <NewInitialDashboardTechnologies></NewInitialDashboardTechnologies>
      <NewInitialDashboardPresentation/>
      <NewInitialDashboardContact/>
    </div>
  );
};

export default NewInitialDashboard;
