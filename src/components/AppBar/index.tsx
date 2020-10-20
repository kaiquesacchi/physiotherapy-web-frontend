import React from "react";
import AppBarMD from "@material-ui/core/AppBar";
import { IconButton, Menu, MenuItem, Toolbar } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";

const SCToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

export default function AppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBarMD position="static">
      <SCToolbar>
        <h1>Meus Vídeos</h1>
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
    </AppBarMD>
  );
}
