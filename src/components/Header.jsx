import mainlogo from "../assets/mainlogo.png";

export default function Header() {
  return (
    <header>
      <nav>
        <img src={mainlogo} alt="main logo" />
      </nav>
    </header>
  );
}
