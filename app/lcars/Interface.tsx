import React from "react";
import LcarsButton from "./LCARSButton";
import LcarsBar from "./LCARSBar";
import LcarsPanel from "./LcarsPanel";
import LcarsText from "./LcarsText";

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen p-4">
      <LcarsPanel className="flex justify-between items-center">
        <LcarsText text="LCARS ACCESS 441" color="#FFCC00" size="text-4xl" />
        <LcarsPanel className="flex space-x-2">
          <LcarsButton label="9886-234" color="#8A2BE2" />
          <LcarsButton label="0128-069" color="#FF4500" />
        </LcarsPanel>
      </LcarsPanel>

      <LcarsBar color="#FFA500" width="100%" className="my-4" />

      <LcarsPanel className="grid grid-cols-3 gap-4">
        <LcarsBar color="#8A2BE2" height="10rem" />
        <LcarsBar color="#DC143C" height="10rem" />
        <LcarsBar color="#FFD700" height="10rem" />
      </LcarsPanel>

      <LcarsPanel className="flex justify-center mt-8">
        <LcarsText text="DATA NODE 188" color="#FFCC00" size="text-2xl" />
      </LcarsPanel>
    </div>
  );
};

export default App;
