import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import AccountWidget from './AccountWidget';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import { useLocation } from "react-router-dom";

import {useState} from 'react';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location=useLocation();
  const isActive = location.pathname === to;
  return (
    <MenuItem
      active={isActive===""? "Dashboard" : isActive}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const NavBar = ({ isSidebar,toggleSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={!isSidebar} width={250} collapsedWidth={80}>
        <Menu iconShape="square">
          <MenuItem onClick={toggleSidebar} style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}icon={!isSidebar?<MenuOutlinedIcon />: undefined}>
            
            {isSidebar && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ALL POCKET
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon/>
                </IconButton>
              </Box>
            )}
          </MenuItem>
          
          <Box paddingLeft={!isSidebar ? undefined : "10%"} >
            <Item
              title="Dashboard"
              to="/"
              icon={<SpaceDashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "25px 0 5px 15px" }}
            >
              Features
            </Typography>
            <Item
              title="Account Manage"
              to="/accounts"
              icon={<AccountBalanceOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Investment Tracker"
              to="/investment"
              icon={<TrendingUpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Budget Manager"
              to="/budget"
              icon={<AccountBalanceWalletOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Expense Manager"
              to="/expenses"
              icon={<CurrencyRupeeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reminder"
              to="/reminder"
              icon={<InsertInvitationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Debt Manager"
              to="/debt"
              icon={<MoneyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "20px 0 5px 15px" }}
            >
              Support
            </Typography>

            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/faq"
              icon={<LiveHelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "10px 0 5px 15px" }}
            >
              Account
            </Typography>

          </Box>
            <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <AccountWidget />
          </Box>
          

        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default NavBar;
