import React from "react";
import { NavLink } from "react-router-dom";
import logo4 from "../../images/logo4.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import "./sidebar.css";
import { Box, Typography } from "@mui/material";

function Sidebar() {
  return (
    <div className="sidebar">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            padding: "20px 0px",
            fontFamily: "'Poppins', sans-serif",
            color: "#0d47a1",
            letterSpacing: "1px",
            background: "linear-gradient(45deg, #2196f3, #f44336)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <NavLink style={{ fontSize: "2rem", fontWeight: 600 }} to="/">
            Trend<span style={{ color: "#f44336" }}>Trove</span>
          </NavLink>
        </Typography>
      </Box>
      <NavLink to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </NavLink>
      <NavLink>
        <SimpleTreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem itemId="1" label="Products">
            <NavLink to="/admin/products">
              <TreeItem itemId="2" label="All" labelIcon={<PostAddIcon />} />
            </NavLink>

            <NavLink to="/admin/product">
              <TreeItem itemId="3" label="Create" labelIcon={<AddIcon />} />
            </NavLink>
          </TreeItem>
        </SimpleTreeView>
      </NavLink>
      <NavLink to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </NavLink>
    </div>
  );
}

export default Sidebar;
