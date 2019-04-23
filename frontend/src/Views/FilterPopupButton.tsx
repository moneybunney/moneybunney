import { Fab, Popover } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";

import React, { useState } from "react";

interface IProps {
  children: JSX.Element;
}

const FilterPopupButton = ({ children: Popup }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab onClick={handleClick} color="secondary" aria-label="Filter">
        <FilterList />
      </Fab>
      <Popover
        id="filter-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        {Popup}
      </Popover>
    </>
  );
};

export default FilterPopupButton;
