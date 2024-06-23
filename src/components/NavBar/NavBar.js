import React, { Component } from 'react';
import {Divider} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import theme from '../../themes/defaultTheme';
import variables from '../../configs/variables';
import SignUpButton from '../common/components/Buttons/SignUpButton';
import { TemporaryDrawer } from '../Drawers';
import ProfileLinkListItem from '../Drawers/ProfileLinkListItem';
import LinkListItemWithIcon from '../common/components/LinkListItemWithIcon';
import styles from './NavBar.module.sass';
import SectionTitleItem from "../common/components/SectionTitleItem";
import ListIcon from '@material-ui/icons/List';

// Sets the color and elevation of the navbar
const overrideTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: theme.palette.background.dark,
      },
    },
    MuiPaper: {
      elevation4: {
        boxShadow: 'none',
      },
    },
  },
});

const courseDrawerItems = [
  {
    path: variables.paths.coursesSearch,
    text: 'Buscar Cursos',
    icon: (<SearchRoundedIcon />)
  },{
    path: variables.paths.courses,
    text: 'Mis Cursos',
    icon: (<CollectionsBookmarkRoundedIcon />)
  }
];

const playgroundDrawerItems = [
  {
    path: variables.paths.playgroundNew,
    text: 'Generar Ejercicio',
    icon: (<CategoryRoundedIcon />)
  },
  {
    path: variables.paths.playgroundList,
    text: 'Mis Ejercicios',
    icon: (<ListIcon />)
  }
];

class NavBar extends Component {
  getDrawer = () => {
    const { profile } = this.props;

    const shouldShowPlayground = profile?.email && (profile.email === "lgimenez@fi.uba.ar" || profile.email === "aimgarcia@fi.uba.ar")
    if (!profile) {
      return '';
    }

    return (
      <TemporaryDrawer>
        <ProfileLinkListItem/>
        <div className={styles.divider}>
          <Divider variant="middle"/>
          <SectionTitleItem text={"Cursos"}/>
        </div>
        {courseDrawerItems.map((item) => (
          <LinkListItemWithIcon key={item.path} path={item.path} text={item.text} icon={item.icon}/>
        ))}
        {shouldShowPlayground && <div className={styles.divider}>
          <Divider variant="middle"/>
          <SectionTitleItem text={"Modo Libre"}/>
        </div>}
        {shouldShowPlayground && playgroundDrawerItems.map((item) => (
          <LinkListItemWithIcon key={item.path} path={item.path} text={item.text} icon={item.icon}/>
        ))}

      </TemporaryDrawer>
    );
  }

  getLoginButtons = () => {
    const {
      onGoogleLogin, onSignUp, onLogout, googleClientId, profile
    } = this.props;

    if (profile) {
      return (
        <Button onClick={onLogout} color="inherit">
          Log out
        </Button>
      );
    }

    return (
      <div style={{ display: 'flex' }}>
        <SignUpButton
          size="small"
          onClick={onSignUp}
          className={styles.signUpButton}
        />
      </div>
    );
  }

  render() {
    return (
      <ThemeProvider theme={overrideTheme}>
        <AppBar position="static">
          <Toolbar>
            {this.getDrawer()}
            <Typography variant="h6" className={styles.title}>
              <Link className={styles.linkWithoutStyles} color="textPrimary" to={{ pathname: '/' }}>Math Learning </Link>
            </Typography>
            {this.getLoginButtons()}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}

export default NavBar;
