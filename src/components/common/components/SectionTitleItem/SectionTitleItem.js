import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';

import styles from '../../../../App.module.sass';

export default function SectionTitleItem(props) {
  const {
    text
  } = props;

  return (
    <ListItem>
      <ListItemText secondary={text} className={styles.textLeft} />
    </ListItem>
  );
}
