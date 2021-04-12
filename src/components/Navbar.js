import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => (
  <div className='d-flex flex-row justify-content-between pt-4 pb-2 bg-secondary' id='navbar'>
    <div className='ml-4 brand-icon p-2 text-white'>
      GraphCMS Blog
    </div>
    <div className='mr-4' style={{ width: "25%" }}>
      <ul className='list-unstyled d-flex flex-row justify-content-between text-white' style={{ width: "100%" }}>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default Navbar;