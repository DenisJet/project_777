import { useState } from "react";

export const useSort = () => {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return { sortField, setSortField, sortDirection, toggleSortDirection };
};
