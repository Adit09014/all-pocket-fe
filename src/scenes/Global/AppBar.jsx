import {
  Box, IconButton, useTheme, Popover, InputBase, Paper, List, ListItemButton, ListItemText,
  Typography
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCard from "./AccountCard";
import { useNavigate } from "react-router-dom";


export const AppBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [accountAnchor, setAccountAnchor] = useState(null);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('https://all-pocket-be.onrender.com/api/auth/verify', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleAccountClick = (event) => {
    setAccountAnchor(accountAnchor ? null : event.currentTarget);
  };

  const accountOpen = Boolean(accountAnchor);

  const suggestions = [
    { label: "Accounts", path: "/accounts" },
    { label: "Investments", path: "/investment" },
    { label: "Budgets", path: "/budget" },
    { label: "Expenses", path: "/expenses" },
    { label: "Reminders", path: "/reminder" },
    { label: "Debt", path: "/debt" }
  ].filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) && search !== ""
  );

  const handleSuggestionClick = (path) => {
    setShowSuggestions(false);
    setSearch("");
    navigate(path);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" alignItems="center" gap="10px" position="relative">
        {isLoggedIn && (
          <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => {
                if (search) setShowSuggestions(true);
              }}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        {isLoggedIn && showSuggestions && (
          <Paper
            sx={{
              position: "absolute",
              top: "40px",
              left: 0,
              width: "100%",
              zIndex: 10,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <List dense>
              {suggestions.length === 0 ? (
                <ListItemText sx={{ px: 2, py: 1 }} primary="No results" />
              ) : (
                suggestions.map((item, idx) => (
                  <ListItemButton key={idx} onClick={() => handleSuggestionClick(item.path)}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))
              )}
            </List>
          </Paper>
        )}
        {!isLoggedIn && (
          <Box>
            <Typography variant="h3" color={colors.grey[100]}>All Pocket</Typography>
            </Box>
        )}
      </Box>

      {/* Right Side Icons */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>

        {isLoggedIn && (
          <IconButton onClick={handleAccountClick}>
            <PersonOutlinedIcon />
          </IconButton>
        )}
      </Box>

      {/* Account Popover */}
      <Popover
        id="account-popover"
        open={accountOpen}
        anchorEl={accountAnchor}
        onClose={() => setAccountAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          sx: { mt: -1, mr: 1, borderRadius: 2, boxShadow: 3, minWidth: 250 },
        }}
      >
        <AccountCard />
      </Popover>
    </Box>
  );
};
