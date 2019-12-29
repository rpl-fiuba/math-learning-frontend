import React from 'react';
import { Popover, Typography } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import styles from './HelpTooltip.module.sass';

export default function HelpTooltip(props) {
  const { help, className } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleHelpAsked = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHelpClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className={className}>
      <HelpIcon
        id="help-icon"
        fontSize="small"
        className={styles.helpIcon}
        onClick={handleHelpAsked}
      />
      <Popover
        open={open}
        id="help-popover"
        anchorEl={anchorEl}
        onClose={handleHelpClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography className={styles.helpText} variant="body2">
          {help}
        </Typography>
      </Popover>
      {/* TODO: Fix issue: https://github.com/mui-org/material-ui/issues/17353, https://github.com/mui-org/material-ui/issues/17636 */}
    </div>
  );
}
