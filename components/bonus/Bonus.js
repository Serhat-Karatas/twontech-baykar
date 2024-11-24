import React from "react";
import DownloadReport from "@/components/bonus/DownloadReport";
import DarkModeToggle from "@/components/bonus/DarkModeToggle";
import SavingsTip from "@/components/bonus/SavingsTip";

const Bonus = () => {
  return (
    <div className="flex flex-col gap-4 mb-40">
      <h2 className="text-3xl font-bold text-center mb-8">Bonus Maddeler</h2>
      <SavingsTip />
      <DarkModeToggle />
      <DownloadReport />
    </div>
  );
};

export default Bonus;
