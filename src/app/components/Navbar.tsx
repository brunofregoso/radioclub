import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 w-full shadow-lg bg-black transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name and SVG Image */}
          <div className="flex items-center space-x-2">
            <Link href="#landing">
              <div className="cursor-pointer italic font-extrabold text-2xl">blnd</div>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40" // Adjust width
              height="40" // Adjust height
              viewBox="0 0 100 100" // Adjust viewBox according to your SVG
              className="object-contain"
            >
              <path d="M503.319,5.939c-5.506-4.705-12.783-6.767-19.958-5.635L169.555,49.852c-12.04,1.901-20.909,12.28-20.909,24.47v99.097v156.903H99.097C44.455,330.323,0,371.073,0,421.161C0,471.25,44.455,512,99.097,512c54.642,0,99.097-40.75,99.097-90.839v-66.065V194.588l264.258-41.725v136.169h-49.548c-54.642,0-99.097,40.75-99.097,90.839s44.455,90.839,99.097,90.839S512,429.959,512,379.871v-66.065V123.871V24.774C512,17.529,508.827,10.646,503.319,5.939z" />
            </svg>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="hover:text-slate-200">About</Link>
            <Link href="#features" className="hover:text-slate-200">Features</Link>
            <Link href="#contact" className="hover:text-slate-200">Contact</Link>
          </div>

          {/* Hamburger Menu for mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-4 px-2 pt-2 pb-3">
            <Link href="#about" className="block">About</Link>
            <Link href="#features" className="block">Features</Link>
            <Link href="#contact" className="block">Contact</Link>
            <button className="block" onClick={toggleMenu}>Login</button>
          </div>
        </div>
      )}
    </nav>
  );
}
