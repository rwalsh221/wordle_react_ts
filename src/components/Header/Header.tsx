import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.header_container}>
        <span className={classes.header_red}>w</span>
        <span className={classes.header_red}>o</span>
        <span className={classes.header_blue}>r</span>
        <span className={classes.header_blue}>d</span>
        <span className={classes.header_green}>l</span>
        <span className={classes.header_green}>e</span>
      </h1>
    </header>
  );
};

export default Header;
