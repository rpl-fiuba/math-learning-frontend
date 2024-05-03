import React, { Component } from 'react';
import {
    TextField,
    Radio,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Typography,
    Divider,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Modal from '../Modal';

import styles from './LoginModal.module.sass';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      role: null,
      createAccountDisabled: true
    };
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin = (googleUserProfile) => {
    const { onGoogleLogin } = this.props;

    onGoogleLogin(googleUserProfile);
  };

  onClickSignUp = (googleUserProfile) => {
    const { onGoogleSignUp } = this.props;
    const { name, role } = this.state;

    onGoogleSignUp(googleUserProfile, { name, role });
  };

  onChangeName = (event) => {
    const { role } = this.state;
    const newName = event.target.value;
    const createAccountDisabled = !newName || !role;

    this.setState({ name: newName, createAccountDisabled });
  };

  onChangerole = (event) => {
    const { name } = this.state;
    const newrole = event.target.value;
    const createAccountDisabled = !name || !newrole;

    this.setState({ role: newrole, createAccountDisabled });
  };

  render() {
    const {
      googleClientId, onClose
    } = this.props;
    const { createAccountDisabled } = this.state;

    return (
        <Modal className={styles.modal} onClose={onClose}>
          <div style={{justifyContent: 'center'}}>
            <Typography className={styles.modalTitle} variant="subtitle2" align="center" color="textSecondary"
                        component="p">
              Si ya tenés una cuenta creada en Math Learning, solo iniciá sesión con Google
            </Typography>
              <div style={{justifyContent: 'center', display: 'flex'}}>
              <GoogleLogin
                  className={styles.button}
                  clientId={googleClientId}
                  text="signin_with"
                  useOneTap={false}
                  shape="circle"
                  width={100}
                  onSuccess={(result) => this.onClickLogin(result)}
                  onFailure={(error) => console.log('google login error', error)}
                  cookiePolicy="single_host_origin"
              />
            </div>
          </div>
          <Divider className={styles.divider} variant="middle"/>
          <Typography className={styles.modalTitle} variant="subtitle2" align="center" color="textSecondary" component="p">
            Si todavía no tenés una cuenta en Math Learning, ingresa tu nombre, tipo de usuario y registrate con Google para crearla
          </Typography>
          <TextField
              id="signup-name"
              label="Nombre y Apellido"
              onChange={this.onChangeName}
              className={styles.name}
              fullWidth
              margin="normal"
              variant="outlined"
          />
          <FormControl className={styles.role} component="fieldset">
              <InputLabel className={styles.roleType} variant={"outlined"}  id="demo-simple-select-helper-label">Tipo de Usuario</InputLabel>
              <Select
                  label="Tipo de Usuario"
                  labelId="demo-simple-select-helper-label"
                  variant="outlined"
                  value={this.state.role}
                  onChange={this.onChangerole}
              >
                  <MenuItem value="student">Estudiante</MenuItem>
                  <MenuItem value="professor">Profesor</MenuItem>
              </Select>
          </FormControl>

        {!createAccountDisabled && <div style={{justifyContent: 'center', display: 'flex', marginTop: '15px'}}>
            <GoogleLogin
                clientId={googleClientId}
                onSuccess={(credentialResponse) => {
                    this.onClickSignUp(credentialResponse);
                }}
                cookiePolicy="single_host_origin"
                onFailure={(error) => console.log('google login error', error)}
                text="signup_with"
                shape="circle"
                theme="filled_black"
                width={100}
                useOneTap={false}
                render={(renderProps) => (
                    <Button
                        id="create-account-button"
                        onClick={renderProps.onClick}
                        size="large"
                        disabled={createAccountDisabled || renderProps.disabled}
                        className={classNames(
                            styles.createAccount,
                            createAccountDisabled ? styles.createAccountDisabled : styles.createAccountEnabled
                        )}
                    >
                        Crear cuenta
                    </Button>
                )}
            />
        </div>}
        </Modal>
    );
  }
}

export default LoginModal;
