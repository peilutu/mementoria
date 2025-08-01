import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="flex gap-8 px-2 font-bold">
          <Link to="/">Mementoria</Link>
          <Link to="/scrapebooks">My Scrapebooks</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>
    </header>
  );
}
