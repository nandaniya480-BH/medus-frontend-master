import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// components
import Button from '../buttons/Button';
import Login from '../../sections/forms/Login';

export default function CardLoginRegister({
  leftCard,
  rightCard,
  detailsPanel,
  color,
}) {
  const location = useLocation();
  const [animating, setAntimating] = React.useState(false);
  const [leftCardTransform, setLeftCardTransform] = React.useState('');
  const [rightCardTransform, setRightCardTransform] =
    React.useState('z-1 opacity-0');
  const [panelTransform, setPanelTransform] = React.useState('');
  const [panelInnerTransform, setPanelInnerTransform] = React.useState('');
  const [panelLeftTransform, setPanelLeftTransform] = React.useState('');
  const [panelRightTransform, setPanelRightTransform] =
    React.useState('-translate-x-1/5');

  useEffect(() => {
    if (location.search && location.search === '?register') {
      setLeftCardTransform('-translate-x-full');
      setRightCardTransform('z-5 opcity-1 md:translate-x-full');
      setPanelTransform('-translate-x-full');
      setPanelInnerTransform('translate-x-1/2');
      setPanelLeftTransform('translate-x-1/5');
      setPanelRightTransform('');
    } else {
      setLeftCardTransform('');
      setRightCardTransform('z-1 opacity-0');
      setPanelTransform('');
      setPanelInnerTransform('');
      setPanelLeftTransform('');
      setPanelRightTransform('-translate-x-1/5');
    }
  }, [location]);

  const animation = (e) => {
    e.preventDefault();
    if (!animating) {
      setAntimating(true);
      panelTransform === ''
        ? setPanelTransform('-translate-x-full')
        : setPanelTransform('');
      panelInnerTransform === ''
        ? setPanelInnerTransform('translate-x-1/2')
        : setPanelInnerTransform('');
      panelRightTransform === ''
        ? setPanelRightTransform('-translate-x-1/5')
        : setPanelRightTransform('');
      panelLeftTransform === ''
        ? setPanelLeftTransform('translate-x-1/5')
        : setPanelLeftTransform('');
      leftCardTransform === ''
        ? setLeftCardTransform('translate-x-full')
        : setLeftCardTransform('');
      rightCardTransform === 'z-1 opacity-0'
        ? setRightCardTransform('z-5 opcity-1 md:translate-x-full')
        : setRightCardTransform('z-1 opacity-0');
      setTimeout(function () {
        setAntimating(false);
      }, 710);
    }
  };
  let panelColorClass = {
    dark: 'bg-blueGray-800 text-white',
    primary: 'bg-gradient-to-r from-primary-200 to-primary-regular text-white',
  };
  return (
    <>
      <div className="bg-blueGray-100 rounded-lg md:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] relative overflow-hidden h-full z-1 max-w-full min-h-480-px w-768-px container mx-auto px-4">
        {/* left card start */}
        <div
          className={
            'transition-all bg-blueGray-100 duration-700 ease-in-out h-full top-0 absolute md:w-1/2 w-full left-0 z-2 transform ' +
            leftCardTransform
          }
        >
          <div className="flex items-center justify-center flex-col px-12 h-full text-center">
            <h2 className="text-2xp mb-3 font-bold">{leftCard.title}</h2>
            <div className="text-center">
              {leftCard.socials.map((prop, key) => (
                <Button key={key} {...prop.button}>
                  <i className={prop.icon}></i>
                  {prop.button && prop.button.children}
                </Button>
              ))}
            </div>
            <span className="text-blueGray-500 mt-6 mb-3">
              {leftCard.subtitle}
            </span>
            <Login />
            <div className="mt-3 md:hidden">
              <p className="mb-3">oder</p>
              <Button
                {...{ color: 'primary', children: 'Registrieren', size: 'lg' }}
                onClick={animation}
              />
            </div>
          </div>
        </div>
        {/* left card stop */}
        {/* right card start */}
        <div
          className={
            'transition-all bg-blueGray-100 duration-700 ease-in-out h-full top-0 absolute md:w-1/2 w-full left-0 transform ' +
            rightCardTransform
          }
        >
          <div className="flex items-center justify-center flex-col px-12 h-full text-center">
            <h2 className="text-2xp mb-2 font-bold">{rightCard.title}</h2>
            <div className="text-center">
              {rightCard.socials.map((prop, key) => (
                <Button key={key} {...prop.button}>
                  <i className={prop.icon}></i>
                  {prop.button && prop.button.children}
                </Button>
              ))}
            </div>
            <span className="text-blueGray-500 mt-6 mb-3">
              {rightCard.subtitle}
            </span>
            <div className="mt-3 mb-3">
              <Link
                {...rightCard.userRegister}
                className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none py-3 px-5 rounded-full shadow-lg text-sm font-bold"
              >
                <i className="fa-solid fa-hospital"></i>{' '}
                {' ' + rightCard.userRegister.children}
              </Link>
            </div>
            <div className="mt-5">
              <Link
                {...rightCard.companyRegister}
                className="text-white bg-gradient-to-r from-primary-200 to-primary-regular border-none py-3 px-5 rounded-full shadow-lg text-sm font-bold"
              >
                <i className="fa-solid fa-hospital"></i>{' '}
                {' ' + rightCard.companyRegister.children}
              </Link>
            </div>
            <div className="mt-6 md:hidden">
              <p className="mb-3 text-blueGray-500">oder</p>
              <Button
                {...{
                  color: 'primary',
                  children: 'Zurück zum Login',
                  size: 'lg',
                }}
                onClick={animation}
              />
            </div>
          </div>
        </div>
        {/* right card stop */}
        {/* panel start */}
        <div
          className={
            'transition-all duration-700 ease-in-out transform absolute top-0 md:left-1/2 left-full w-1/2 h-full overflow-hidden z-9999 md:block hidden ' +
            panelTransform
          }
        >
          <div
            className={
              panelColorClass[color] +
              ' transition-all duration-700 ease-in-out transform relative -left-full h-full w-double ' +
              panelInnerTransform
            }
          >
            {/* left panel start */}
            <div
              className={
                'transition-all duration-700 ease-in-out transform absolute flex items-center justify-center flex-col p-10 text-center top-0 right-0 h-full w-1/2 ' +
                panelLeftTransform
              }
            >
              <h3 className="text-2xp mb-2 font-bold">
                {detailsPanel.leftTitle}
              </h3>
              <p className="mb-6">{detailsPanel.leftDescription}</p>
              <Button {...detailsPanel.leftButton} onClick={animation} />
            </div>
            {/* left panel stop */}
            {/* right panel start */}
            <div
              className={
                'transition-all duration-700 ease-in-out transform absolute flex items-center justify-center flex-col p-10 text-center top-0 h-full w-1/2 ' +
                panelRightTransform
              }
            >
              <h3 className="text-2xp mb-2 font-bold">
                {detailsPanel.rightTitle}
              </h3>
              <p className="mb-6">{detailsPanel.rightDescription}</p>
              <Button {...detailsPanel.rightButton} onClick={animation} />
            </div>
            {/* right panel stop */}
          </div>
        </div>
        {/* panel stop */}
      </div>
    </>
  );
}

const cardTypes = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  // props to pass to the Button component
  button: PropTypes.object,
  userRegister: PropTypes.object,
  companyRegister: PropTypes.object,
  // array of props to pass to the Input components
  inputs: PropTypes.arrayOf(PropTypes.object),
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      // props to pass to the Button component that wrapps the icon
      button: PropTypes.object,
    })
  ),
});

CardLoginRegister.defaultProps = {
  leftCard: { inputs: [], button: {}, socials: [] },
  rightCard: { inputs: [], button: {}, socials: [] },
  detailsPanel: {
    leftButton: {},
    rightButton: {},
  },
  color: 'primary',
};

CardLoginRegister.propTypes = {
  leftCard: cardTypes,
  rightCard: cardTypes,
  detailsPanel: PropTypes.shape({
    leftTitle: PropTypes.string,
    leftDescription: PropTypes.string,
    leftButton: PropTypes.object,
    rightTitle: PropTypes.string,
    rightDescription: PropTypes.string,
    rightButton: PropTypes.object,
  }),
  // color for the detailsPanel
  color: PropTypes.oneOf(['dark', 'primary']),
};
