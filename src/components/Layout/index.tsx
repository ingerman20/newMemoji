import styles from './index.module.css';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};
