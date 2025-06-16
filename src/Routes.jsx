// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";

// Page imports
import Login from "pages/login";
import DashboardOverview from "pages/dashboard-overview";
import MachineFleetManagement from "pages/machine-fleet-management";
import InventoryManagement from "pages/inventory-management";
import SalesAnalyticsReporting from "pages/sales-analytics-reporting";
import MaintenanceServiceManagement from "pages/maintenance-service-management";
import UserRoleManagement from "pages/user-role-management";
import MachineConfigurationSettings from "pages/machine-configuration-settings";
import NotificationsAlerts from "pages/notifications-alerts";
import FinancialReporting from "pages/financial-reporting/index";
import ApiIntegrationManagement from "pages/api-integration-management";
import DatabaseSchemaManagement from "pages/database-schema-management";
import FunctionTestingValidation from "pages/function-testing-validation";
import ErrorHandlingSystemRecovery from "pages/error-handling-system-recovery";
import PerformanceMonitoringOptimization from "pages/performance-monitoring-optimization";
import SecurityAccessControl from "pages/security-access-control";
import ComponentLibraryDesignSystem from "pages/component-library-design-system";
import CodeQualityTestingDashboard from "pages/code-quality-testing-dashboard";
import DevelopmentEnvironmentSetup from "pages/development-environment-setup";
import PerformanceOptimizationTools from "pages/performance-optimization-tools";
import DeploymentDevOpsManagement from "pages/deployment-dev-ops-management";

// New page imports
import OperatorMobileDashboard from "pages/operator-mobile-dashboard";
import IngredientCatalogManagement from "pages/ingredient-catalog-management";
import FieldServiceMobileApp from "pages/field-service-mobile-app";
import RoleBasedAccessControlCenter from "pages/role-based-access-control-center";
import MachineHealthMonitoringDashboard from "pages/machine-health-monitoring-dashboard";
import SupplyChainOptimizationCenter from "pages/supply-chain-optimization-center";
import ComprehensiveTestingValidationCenter from "pages/comprehensive-testing-validation-center";

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
          <Route path="/notifications-alerts" element={<NotificationsAlerts />} />
          <Route path="/financial-reporting" element={<FinancialReporting />} />
          <Route path="/api-integration-management" element={<ApiIntegrationManagement />} />
          <Route path="/database-schema-management" element={<DatabaseSchemaManagement />} />
          <Route path="/function-testing-validation" element={<FunctionTestingValidation />} />
          <Route path="/error-handling-system-recovery" element={<ErrorHandlingSystemRecovery />} />
          <Route path="/performance-monitoring-optimization" element={<PerformanceMonitoringOptimization />} />
          <Route path="/security-access-control" element={<SecurityAccessControl />} />
          <Route path="/component-library-design-system" element={<ComponentLibraryDesignSystem />} />
          <Route path="/code-quality-testing-dashboard" element={<CodeQualityTestingDashboard />} />
          <Route path="/development-environment-setup" element={<DevelopmentEnvironmentSetup />} />
          <Route path="/performance-optimization-tools" element={<PerformanceOptimizationTools />} />
          <Route path="/deployment-dev-ops-management" element={<DeploymentDevOpsManagement />} />
          
          {/* New routes */}
          <Route path="/operator-mobile-dashboard" element={<OperatorMobileDashboard />} />
          <Route path="/ingredient-catalog-management" element={<IngredientCatalogManagement />} />
          <Route path="/field-service-mobile-app" element={<FieldServiceMobileApp />} />
          <Route path="/role-based-access-control-center" element={<RoleBasedAccessControlCenter />} />
          <Route path="/machine-health-monitoring-dashboard" element={<MachineHealthMonitoringDashboard />} />
          <Route path="/supply-chain-optimization-center" element={<SupplyChainOptimizationCenter />} />
          <Route path="/comprehensive-testing-validation-center" element={<ComprehensiveTestingValidationCenter />} />
          
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;