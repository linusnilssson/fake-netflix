"use client";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import SearchBar from "./SearchBar"; // Importera den nya sökfältet-komponenten här

// Din movies.json-data
import { Menu } from "@mui/material";
import movies from "../../data/movies.json";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  thumbnail: string;
}

export default function PrimarySearchAppBar() {
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [isSecondMobileMenuOpen, setSecondMobileMenuOpen] =
    React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleSecondMobileMenuClose = () => {
    setSecondMobileMenuOpen(false);
  };

  const handleSecondMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSecondMobileMenuOpen(true);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const secondMobileMenuId = "secondary-search-account-menu-mobile";
  const renderSecondMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      id={secondMobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isSecondMobileMenuOpen}
      onClose={handleSecondMobileMenuClose}
    >
      <MenuItem onClick={handleSecondMobileMenuClose}>Home</MenuItem>
      <MenuItem onClick={handleSecondMobileMenuClose}>Series</MenuItem>
      <MenuItem onClick={handleSecondMobileMenuClose}>New</MenuItem>
      <MenuItem onClick={handleSecondMobileMenuClose}>Popular</MenuItem>
      <MenuItem onClick={handleSecondMobileMenuClose}>My List</MenuItem>
    </Menu>
  );

  // Funktion för att söka i filmer baserat på sökterm
  const handleSearch = (searchTerm: string) => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={secondMobileMenuId}
            aria-haspopup="true"
            onClick={handleSecondMobileMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "red",
              fontSize: "2rem",
            }}
          >
            X-DANI
          </Typography>
          {/* Använd den nya sökfältet-komponenten här */}
          <SearchBar onSearch={handleSearch} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <MenuItem>
                <Link
                  href="/"
                  underline="hover"
                  sx={{
                    "&:hover": {
                      textDecoration: "none",
                      textDecorationColor: "none",
                    },
                  }}
                >
                  <Typography
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Home{" "}
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/series"
                  underline="hover"
                  sx={{
                    "&:hover": {
                      textDecoration: "none",
                      textDecorationColor: "none",
                    },
                  }}
                >
                  <Typography
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Series{" "}
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/new"
                  underline="hover"
                  sx={{
                    "&:hover": {
                      textDecoration: "none",
                      textDecorationColor: "none",
                    },
                  }}
                >
                  <Typography
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    New
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/popular"
                  underline="hover"
                  sx={{
                    "&:hover": {
                      textDecoration: "none",
                      textDecorationColor: "none",
                    },
                  }}
                >
                  <Typography
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Popular
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  href="/bookmark"
                  underline="hover"
                  sx={{
                    "&:hover": {
                      textDecoration: "none",
                      textDecorationColor: "none",
                    },
                  }}
                >
                  <Typography
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    My List
                  </Typography>
                </Link>
              </MenuItem>
              <Badge badgeContent={90} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={21} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMenu}
      {renderSecondMobileMenu}

      {/* Visar sökresultaten här */}
      <Box>
        {searchResults.map((result) => (
          <div key={result.id}>
            <img src={result.thumbnail} alt={result.title} />
            <Typography>{result.title}</Typography>
            <Typography>{result.year}</Typography>
            <Typography>{result.genre}</Typography>
          </div>
        ))}
      </Box>
    </Box>
  );
}
