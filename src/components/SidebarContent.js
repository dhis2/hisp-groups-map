import React from "react";
import SidebarToggle from "./SidebarToggle";
import CategoryGroup from "./CategoryGroup";

const Sidebar = ({ category, isDocked, onClose, onSelect }) => (
  <>
    {!isDocked && <SidebarToggle type="close" onClick={onClose} />}
    <CategoryGroup group="explore" onClick={onSelect} category={category} />
    <CategoryGroup group="region" onClick={onSelect} category={category} />
    <CategoryGroup group="other" onClick={onSelect} category={category} />
  </>
);

export default Sidebar;
