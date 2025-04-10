const Footer = ({ name }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      {year} @ {name}
    </footer>
  );
};

export default Footer;
