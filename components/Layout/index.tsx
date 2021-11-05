import React, { Fragment } from "react";

import { alpha, styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const drawerWidth = "15rem";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388e3c",
    "&:hover": {
      backgroundColor: alpha("#388e3c", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388e3c",
  },
}));

export default function Layout({ children }, props) {
  const { window } = props;

  const theme = useTheme();
  const colorModeProvider = React.useContext(ColorModeContext);
  const [mode, setMode] = React.useState("light");

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setOpen(event.target.checked);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const themeProvider = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const drawer = (
    <div>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4">
          <b>LOJA</b>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Pedidos", "Clientes", "Configurações", "Gráficos"].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ColorModeContext.Provider value={colorModeProvider}>
      <ThemeProvider theme={themeProvider}>
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* <CssBaseline /> */}
          <AppBar
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth})` },
              ml: { sm: `${drawerWidth}` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <GreenSwitch
                        checked={open}
                        onChange={handleChange}
                        color="success"
                      />
                    }
                    label={
                      open ? (
                        <span style={{ color: "#388e3c", fontWeight: "bold" }}>
                          ABERTO
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          FECHADO
                        </span>
                      )
                    }
                  />
                </FormGroup>

                <Box style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon sx={{ color: "#000" }} />
                    )}
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: "0.5rem",
              width: { sm: `calc(100% - ${drawerWidth})%` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
