import styles from "../styles/Header.module.css";

import React from "react";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>
        <span>Neo</span> Hacker News
      </h1>
      <p>Get Hacked by the newest tech buzzes.</p>
    </div>
  );
};

export default Header;
