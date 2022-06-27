
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FavouritesCard from 'components/card/Favourites';
import LeaguesCard from 'components/card/Leagues';
import { useHistory, Link } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Profile', 'League', 'Sign up'];

export default function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Match Chat
      </Typography>
      <Divider />
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'inline' } }}
          >
            Match Chat
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Search>
              <SearchIconWrapper>
              <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ mr: 5}}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            {navItems.map((item) => (
              <Button key={item} sx={{ mr: 5, color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="div" sx={{width: "100%", p: 3 }}>
        <Toolbar />
        
        <Box sx={{float: "right",px: 5, width: "70%"}} component="section">
          <Typography variant="h2" sx={{ fontWeight: 700, color: 'maroon', my: "100px"}}>
              WELCOME to the Match Chat
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, color: 'grey', my: 5}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet nulla id nisi scelerisque, vitae vulputate ex gravida.
          Fusce eget lectus sit amet massa gravida dignissim sed non risus. Nullam bibendum dui tortor.
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700, my: 5}}>
              Don't have an account yet?<Link to="/login">Create a new account</Link><br/>
              Have an account already?<Link to="/login">Sign in</Link>

          </Typography>
        </Box>
        <Box component="div" sx={{ width: "30%" }}>
          <FavouritesCard/>
          <LeaguesCard/>
        </Box>
        

      </Box>
    </Box>
  )}