import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import "./ToolBar.css";

function ToolBar() {
  return (
    <div className="toolBar">
      <AppBar position="static">
        <Toolbar className="toolBar__toolbar">
          <Typography variant="h6" className="toolBar__header">
            <strong>Hacker News</strong>
          </Typography>
          <Button className="toolBar__button">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ToolBar;
