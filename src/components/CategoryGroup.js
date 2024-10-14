import React from "react";
import Category from "./Category";
import { categoryGroups, categories } from "../utils/data";

const CategoryGroup = ({ group, category, onClick }) => (
  <div>
    <h2>{categoryGroups[group]}</h2>
    {categories.map((item) => (
      <Category
        key={item.id}
        onClick={onClick}
        selected={category === item.id}
        {...item}
      />
    ))}
  </div>
);

export default CategoryGroup;
