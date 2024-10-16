import React from "react";
import SidebarToggle from "./SidebarToggle";
import RegionGroup from "./RegionGroup";

const Sidebar = ({ region, isDocked, onClose, onSelect }) => (
  <>
    {!isDocked && <SidebarToggle type="close" onClick={onClose} />}
    <RegionGroup group="explore" onClick={onSelect} region={region} />
    <RegionGroup group="region" onClick={onSelect} region={region} />
  </>
);

export default Sidebar;
