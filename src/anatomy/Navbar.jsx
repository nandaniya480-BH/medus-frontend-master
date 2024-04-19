import React, { useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import logo from '../assets/logo/medusLogo.png';
import NavbarLinks from '../components/sections/navbars/NavbarLinks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { authApi } from '../features/auth/userApiSlice';

function Navbar() {
  const { userToken, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const props = {
    color: 'white',
    logoImage: logo,
    logoText: '',
    logoLink: { to: '/' },
    socials: [],
    leftLinks: [
      { to: '/jobs', children: 'Jobs', extraclass: 'place-content-center' },
      {
        to: '/about-us',
        children: 'Über medus',
        extraclass: 'place-content-center',
      },
      { to: '/tipps', children: 'Tipps', extraclass: 'place-content-center' },
      {
        to:
          userToken && (role === 'employeradmin' || role === 'employer')
            ? '/company/job/create'
            : '/inserien',
        children: 'Inserien',
        extraclass:
          'rounded-full place-content-center border border-primary-500 text-center lg:px-4',
      },
    ],
    rightLinks: !userToken
      ? [
          {
            to: '/login',
            children: 'Anmelden',
            extraclass: 'place-content-center',
          },
          {
            to: '/login?register',
            children: 'Registrieren',
            extraclass:
              'rounded-full md:border text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none text-center place-content-center lg:px-4',
          },
        ]
      : [
          {
            to: role === 'employee' ? '/user/profile' : '/company/profile',
            icon: 'fa-solid fa-user-md mr-1',
            children: 'Mein Profil',
            extraclass:
              'rounded-full place-content-center md:border text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none text-center lg:px-4',
          },
          {
            to: '/logout',
            icon: 'fa-solid fa-right-from-bracket mr-1',
            children: 'Abmelden',
            onClick: (e) => {
              e.preventDefault();
              dispatch(authApi.util.resetApiState());
              dispatch(logout());
              navigate('/login');
            },
            extraclass: 'text-red-500 place-content-center md:mt-0 mt-2',
          },
        ],
  };

  return <NavbarLinks {...props} />;
}
Navbar.propTypes = {};
export default Navbar;
