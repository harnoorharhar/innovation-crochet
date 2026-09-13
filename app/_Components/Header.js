import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className=" top-0 my-2 z-50 w-full ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
