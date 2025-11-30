import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg sticky top-0 z-40"></header>
  );
};

export default Header;
