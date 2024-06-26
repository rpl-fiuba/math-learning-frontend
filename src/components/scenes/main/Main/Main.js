import React, { Component } from 'react';
import SignUpButton from '../../../common/components/Buttons/SignUpButton';
import Footer from '../../../Footer';

import styles from './Main.module.sass';

class Main extends Component {
  footer = () => (
    <p>
        Pricing ⋅ Contact ⋅ Blog ⋅ Docs ⋅ Terms and Privacy ⋅ Public GitHub
      <br />
        Copyright © Pivit Inc. 2019. All Rights Reserved
    </p>
  )

  render() {
    const { onSignUp } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.imageContent}>
          <div className={styles.imageText}>
            <p id="main-content" className={styles.imageContentText}>
              Tu herramienta para practicar
              <br />
                análisis matemático
            </p>
            <SignUpButton onClick={onSignUp} size="large" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
