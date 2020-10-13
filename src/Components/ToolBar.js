import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import "./ToolBar.css";
import Switch from "./Switch";

function ToolBar({ darkMode, onDarkModeToggle }) {
  return (
    <div className="toolBar">
      <AppBar position="static">
        <Toolbar className="toolBar__toolbar">
          <Typography variant="h6" className="toolBar__header">
            <strong>Hacker News</strong>
          </Typography>
          <div className="toolBar__right">
            <Switch
              darkMode={darkMode}
              onDarkModeToogle={onDarkModeToggle}
            ></Switch>
            <Button className="toolBar__button">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ToolBar;
