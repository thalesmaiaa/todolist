import todoListLogo from '../../assets/logo-todolist.svg';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={todoListLogo} />
        <h1>
          <span className={styles.titleFirstPart}>to</span>
          <span className={styles.titleSecondPart}>do</span>
        </h1>
      </div>
    </header>
  );
}
