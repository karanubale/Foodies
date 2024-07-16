import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>Discover the lowest prices on your favorite dishes from Foodies with our app. Save money while enjoying delicious meals delivered right to your door.</p>
            {/* <button>View Menu</button> */}
        </div>
    </div>
  )
}

export default Header;