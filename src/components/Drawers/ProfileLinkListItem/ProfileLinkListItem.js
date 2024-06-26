import { Avatar, ListItemAvatar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import React from 'react';
import styles from './ProfileLinkListItem.module.sass';
import SectionTitleItem from "../../common/components/SectionTitleItem";

export default function ProfileLinkListItem(props) {
  const { profile } = props;

  return (
    <div className={styles.profileAvatar}>
      <SectionTitleItem text={"Usuario"}/>
      <ListItem key="Account">
        <ListItemAvatar>
          <Avatar>
            {profile.photo
              ? <img src={profile.photo} /> // eslint-disable-line jsx-a11y/alt-text
              : <AccountBoxIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={profile.name} secondary={(profile?.role && profile.role === "professor") ? "Profesor" : "Estudiante"}/>
      </ListItem>
    </div>
  );
}
