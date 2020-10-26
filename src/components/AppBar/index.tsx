import React, { Dispatch, SetStateAction } from "react";
import AppBarMD from "@material-ui/core/AppBar";
import { IconButton, Menu, MenuItem, Tab, Tabs, Toolbar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";

const SCToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const SCTabs = styled(Tabs)`
  background-color: #6cb087;
`;

interface iProps {
  tabs?: boolean;
  selectedTab?: number;
  setSelectedTab?: Dispatch<SetStateAction<any>>;
  children: React.ReactNode;
}

export default function AppBar({ tabs, selectedTab, setSelectedTab, children }: iProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (_event: React.ChangeEvent<{}>, selectedValue: number) => {
    if (setSelectedTab) setSelectedTab(selectedValue);
  };

  return (
    <AppBarMD position="sticky" style={{ width: "100vw", boxSizing: "content-box" }}>
      <SCToolbar>
        {children}
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      </SCToolbar>
      {tabs ? (
        <SCTabs value={selectedTab} onChange={handleChange}>
          <Tab label="Vídeos" />
          <Tab label="Parâmetros" />
        </SCTabs>
      ) : (
        ""
      )}
    </AppBarMD>
  );
}
