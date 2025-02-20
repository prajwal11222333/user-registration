import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import NAVIGATION from "../navigation"; // ✅ Import navigation

const DashboardLayoutBasic = ({ children }) => {
  return (
    <AppProvider navigation={NAVIGATION}>
      <DashboardLayout>
        <PageContainer>
          {children} 
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutBasic;
