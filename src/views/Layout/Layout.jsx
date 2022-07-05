import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';

const Layout = ({children}) => {
    return (
        <main className={styles.main_layout}>
            {children}
        </main>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;