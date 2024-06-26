import React from 'react';
import { Typography, Container } from '@material-ui/core';
import styles from './Footer.module.sass';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="md">
        <Typography variant="body2" align="center" color="textSecondary" component="p">
          Pricing ⋅ Contact ⋅ Blog ⋅ Docs ⋅ Terms and Privacy ⋅ Public GitHub
          <br />
          Copyright © Math Learning. 2024. All Rights Reserved
        </Typography>
      </Container>
    </footer>
  );
}
