"use client";
import { PlayArrow } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Badge,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import movies from "../../data/movies.json";
import BookmarkButton from "./BookmarkButton";
import SearchBar from "./SearchBar";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  thumbnail: string;
  slug: string;
}

export default function PrimarySearchAppBar() {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [isSecondMobileMenuOpen, setSecondMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<{
    id: number;
    listName: string;
  } | null>(null);

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

  const handleMouseEnter = (id: number, listName: string) => {
    setHoveredIndex({ id, listName });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
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
          <MailIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <NotificationsIcon />
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
      {renderSecondMobileMenu}

      {/* Visa sökresultaten här */}
      <Box sx={{ backgroundColor: "#000000", p: 2 }}>
        {/* <Typography
          variant="h4"
          sx={{ color: "white", marginBottom: "2rem", marginTop: "2rem" }}
        >
          Based on your search...
        </Typography> */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            marginBottom: "2rem",
            gap: 2,
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {searchResults.map((result) => (
            <Link key={result.id} href={`/movie/${result.slug}`}>
              <Card
                key={result.id}
                onMouseEnter={() => handleMouseEnter(result.id, "search")}
                onMouseLeave={handleMouseLeave}
                sx={{ position: "relative" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    src={result.thumbnail}
                    alt={result.title}
                    loading="lazy"
                    sx={{ height: 182, width: 342, objectFit: "cover" }}
                  />
                  {hoveredIndex &&
                    hoveredIndex.id === result.id &&
                    hoveredIndex.listName === "search" && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px",
                          background:
                            "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                          transition: "opacity 0.3s",
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => {
                            // Hantera play-knappens klick
                          }}
                        >
                          <PlayArrow sx={{ color: "white" }} />
                        </IconButton>
                        <BookmarkButton slug={result.slug} />
                      </Box>
                    )}
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
