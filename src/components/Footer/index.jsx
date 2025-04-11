import Link from "next/link";

const Footer = ({ name }) => {
  const year = new Date().getFullYear();

  return (
    <footer>
      {year} @{" "}
      <Link href="https://mahadisaputra.my.id/" className="underline">
        {name}
      </Link>
    </footer>
  );
};

export default Footer;
