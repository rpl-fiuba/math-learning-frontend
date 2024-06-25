import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Button from '@material-ui/core/Button';
import ConfirmActionModal from '../ConfirmActionModal/ConfirmActionModal';
import styles from './SessionExpiredModal.module.sass';

class SessionExpiredModal extends ConfirmActionModal {
  onClickLogin = (googleUserProfile) => {
    const { onGoogleLogin } = this.props;

    onGoogleLogin(googleUserProfile);
  };

  renderAcceptButton = () => {
    const { googleClientId } = this.props;

    return (
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={this.onClickLogin}
        cookiePolicy="single_host_origin"
        onFailure={(error) => console.log('google relogin error', error)}
        render={(renderProps) => (
          <Button
            color="primary"
            variant="outlined"
            id="accept-action"
            onClick={renderProps.onClick}
            size="small"
            className={styles.button}
          >
            Volver a loguearse
          </Button>
        )}
      />
    );
  };
}

SessionExpiredModal.defaultProps = {
  title: 'Tu sesión ha expirado',
  actionType: 'warning',
  explanation: 'Si querés continuar usando la plataforma hacé click en el botón "Iniciar Sesión" debajo de este mensaje para renovar tu sesión con Google'
};

export default SessionExpiredModal;
