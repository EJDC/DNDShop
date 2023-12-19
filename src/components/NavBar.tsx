import React from "react";

export interface NavBarProps {
    handleReturnToCheckout: () => void;
  }

const Navbar: React.FC<NavBarProps> = ({handleReturnToCheckout}) => {
  return (
    <nav className="p-4 bg-primary ">
      {/* Header */}
      <header className="flex justify-between items-center container mx-auto">
        <div className="flex items-center">
          {/* Logo */}
          <h1
            className="text-2xl text-white font-bold text-color-white md:text-4xl md:ml-10"
            role="heading"
          >
            Item Shop
          </h1>
        </div>
        {/* Language Selector and Cart Icon */}
        <div className="flex items-center ml-auto">
          
          {/* Cart Icon */}
          <button
            className="bg-highlight px-3 py-1 rounded ml-3 md:mr-10"
            aria-label="View Cart"
            onClick={handleReturnToCheckout}
          >
            <div className="flex items-center">
              {/* Cart Icon */}
              {/* <img src="/public/chariot.png" alt="Cart" className="w-8 h-8" /> */}

              {/* Cart Text */}
              <span className="m-2">Cart</span>
            </div>
          </button>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
