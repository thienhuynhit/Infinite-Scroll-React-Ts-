import TextField from "@mui/material/TextField";
import React from "react";

export interface SearchBarProps {
  onChange: any;
}

export function SearchBar({ onChange }: SearchBarProps) {
  return (
    <TextField
      id="standard-search"
      label="Search by name of product"
      type="search"
      variant="outlined"
      fullWidth={true}
      onChange={onChange}
    />
  );
}
