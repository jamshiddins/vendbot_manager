import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import DashboardOverview from "pages/dashboard-overview";
import MachineFleetManagement from "pages/machine-fleet-management";
import InventoryManagement from "pages/inventory-management";
import SalesAnalyticsReporting from "pages/sales-analytics-reporting";
import MaintenanceServiceManagement from "pages/maintenance-service-management";
import UserRoleManagement from "pages/user-role-management";
import MachineConfigurationSettings from "pages/machine-configuration-settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard-overview" element={<DashboardOverview />} />
          <Route path="/machine-fleet-management" element={<MachineFleetManagement />} />
          <Route path="/inventory-management" element={<InventoryManagement />} />
          <Route path="/sales-analytics-reporting" element={<SalesAnalyticsReporting />} />
          <Route path="/maintenance-service-management" element={<MaintenanceServiceManagement />} />
          <Route path="/user-role-management" element={<UserRoleManagement />} />
          <Route path="/machine-configuration-settings" element={<MachineConfigurationSettings />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;