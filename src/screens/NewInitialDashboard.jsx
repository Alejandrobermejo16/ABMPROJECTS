import React from "react";
import NewInitialDashboardFilter from "../components/NewInitialDashboard/NewInitialDashboardFilter";
import NewInitialDashboardPresentation from "../components/NewInitialDashboard/NewInitialDashboardPresentation";
import NewInitialDashboardProjects from "../components/NewInitialDashboard/NewInitialDashboardProjects";
import NewInitialDashboardTechnologies from "../components/NewInitialDashboard/NewInitialDashboardTechnologies";



const NewInitialDashboard = () => {

  return (
    <div className="NewInitialDashBoard">
     <NewInitialDashboardFilter/>
      <NewInitialDashboardProjects/>
      <NewInitialDashboardTechnologies></NewInitialDashboardTechnologies>
      <NewInitialDashboardPresentation/>
    </div>
  );
};

export default NewInitialDashboard;
