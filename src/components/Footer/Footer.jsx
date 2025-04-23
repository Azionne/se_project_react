import "./Footer.css";

function Footer({ year }) {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Azionne Vorrice</p>
      <h1 className="footer__year">{year}</h1>
    </footer>
  );
}

export default Footer;
