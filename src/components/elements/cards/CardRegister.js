import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// components
import Register from '../../sections/forms/Register';
import Button from '../buttons/Button';
import { setAuthSliceError } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const userServicesProps = [
  {
    title: 'Stellen-Angebote suche',
    description: 'Schnell und einfach alle passenden Stellen-Angebote finden',
    icon: 'fas fa-magnifying-glass fa-xl',
  },
  {
    title: 'Magic-Match',
    description:
      'Durch den Magic-Match von medus.work verpassen Sie keine passenden Stellen-Angebote mehr',
    icon: 'fas fa-wand-magic-sparkles fa-xl',
  },
  {
    title: 'Lass dich finden',
    description:
      'Mit einem medus.work Konto sind Sie für jedes interessierte Unternehmen einfach zu finden und dies jederzeit anonym',
    icon: 'fas fa-wand-magic-sparkles fa-xl',
  },
  {
    title: 'Persönliche Favoriten',
    description:
      'Die interessanten Stellen-Angebote können Sie einfach und bequem in ihre persönliche Favoritenliste eintragen',
    icon: 'fas fa-star fa-xl',
  },
];

const companyServicesProps = [
  {
    title: 'Ziel-Gruppe',
    description:
      'Mit täglich mehreren tausend Besuchern deckt medus.work die gewünschte Ziel-Gruppe flächendeckend ab',
    color: 'light',
    icon: 'fas fa-magnifying-glass fa-xl',
  },
  {
    title: 'Nummer EINS',
    description:
      'Als Nummer EINS bei den Nachwuchskräften erreichen Sie über medus.work alle Young-Talents für Ihr Unternehmen',
    icon: 'fa-solid fa-trophy fa-xl',
  },
  {
    title: 'Magic-Match',
    description:
      'Durch den Magic-Match von medus.work verpassen Sie keine passenden Stellen-Angebote mehr',
    icon: 'fas fa-wand-magic-sparkles fa-xl',
  },
  {
    title: 'Modersnte Platform',
    description:
      'Die medus.work Plattform ist für alle auf allen gängigen Devices erhältlich',
    icon: 'fa-solid fa-mobile fa-xl',
  },
  {
    title: 'Bestes-Preisleistungsverhältnis',
    description: 'medus.work hat das beste Preis-Leistungs-Verhältnis',
    icon: 'fa-solid fa-tags fa-xl',
  },
  {
    title: 'Schweizer Datenhost',
    description:
      'Als Schweizer Unternehmen hosten wir auch unsere Daten in Rechenzentren in der Schweiz. Bei uns gelten stets Schweizer Rechte und Pflichten',
    icon: 'fa-solid fa-server fa-xl',
  },
];

export default function CardLoginRegister({
  leftCard,
  rightCard,
  detailsPanel,
  color,
  isCompanyRegisterView,
  updateCompanyRegisterView,
}) {
  const location = useLocation();
  const [animating, setAntimating] = useState(false);
  const [leftCardTransform, setLeftCardTransform] = useState('');
  const [rightCardTransform, setRightCardTransform] = useState('z-1 opacity-0');
  const [panelTransform, setPanelTransform] = useState('');
  const [panelInnerTransform, setPanelInnerTransform] = useState('');
  const [panelLeftTransform, setPanelLeftTransform] = useState('');
  const [panelRightTransform, setPanelRightTransform] =
    useState('-translate-x-1/5');
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const handleClick = (value) => {
    updateCompanyRegisterView(value);
    dispatch(setAuthSliceError());
  };

  useEffect(() => {
    if (location.search && location.search === '?company') {
      setLeftCardTransform('-translate-x-full');
      setRightCardTransform('z-5 opcity-1 md:translate-x-full');
      setPanelTransform('-translate-x-full');
      setPanelInnerTransform('translate-x-1/2');
      setPanelLeftTransform('translate-x-1/5');
      setPanelRightTransform('');
      handleClick(true);
    }
    if (location.search && location.search === '?user') {
      setLeftCardTransform('');
      setRightCardTransform('z-1 opacity-0');
      setPanelTransform('');
      setPanelInnerTransform('');
      setPanelLeftTransform('');
      setPanelRightTransform('-translate-x-1/5');
      handleClick(false);
    }
  }, [location.pathname, location.search]); // eslint-disable-line

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
      // eslint-disable-next-line
      handleClick(!isCompanyRegisterView);
    }
  };
  let panelColorClass = {
    dark: 'bg-blueGray-800 text-white',
    primary: 'bg-gradient-to-r from-primary-200 to-primary-regular text-white',
  };
  return (
    <>
      <div className="bg-blueGray-100 rounded-lg md:drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] relative overflow-hidden h-full z-1 min-h-[700px] w-auto-px container mx-auto px-4">
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

            {!isCompanyRegisterView && <Register userRole="employee" />}

            <div className="mt-3 mb-3 md:hidden">
              <p className="mb-3">oder</p>
              <Button
                {...{
                  color: 'primary',
                  children: 'Registrieren Sie sich als Unternehmen!',
                  size: 'lg',
                }}
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
            <h2 className="text-2xp mb-3 font-bold">{rightCard.title}</h2>
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

            {isCompanyRegisterView && <Register userRole={'employeradmin'} />}

            <div className="mt-3 mb-3 md:hidden">
              <p className="mb-3">oder</p>
              <Button
                {...{
                  color: 'primary',
                  children: 'Registrieren Sie sich als Unternehmen!',
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
              <div className="border-bottom mb-2 py-2">
                {userServicesProps.map((item) => (
                  <div
                    key={item.title}
                    className="flex border-b-[0.5px] mb-2 pb-2 text-left"
                  >
                    <div className="flex-none text-sm align-center mx-auto my-auto w-10 h-10">
                      <i className={item.icon}></i>
                    </div>
                    <div className="flex-initial w-64 ...">
                      <h4 className="text-md font-bold">{item.title}</h4>
                      <p className="text-xs">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-2xp mb-2 my-auto font-bold">
                {detailsPanel.leftTitle}
              </h3>
              <Button {...detailsPanel.leftButton} onClick={animation}>
                {detailsPanel.leftButton.children}{' '}
                <i className="fa-solid fa-arrow-right"></i>
              </Button>
            </div>
            {/* left panel stop */}
            {/* right panel start */}
            <div
              className={
                'transition-all duration-700 ease-in-out transform absolute flex items-center justify-center flex-col p-10 text-center top-0 h-full w-1/2 ' +
                panelRightTransform
              }
            >
              <div className="border-bottom mb-2 py-2">
                {companyServicesProps.map((item) => (
                  <div
                    key={item.title}
                    className="flex border-b-[0.5px] mb-2 pb-2 text-left"
                  >
                    <div className="flex-none text-sm align-center mx-auto my-auto w-10 h-10">
                      <i className={item.icon}></i>
                    </div>
                    <div className="flex-initial w-64 ...">
                      <h4 className="text-md font-bold">{item.title}</h4>
                      <p className="text-xs">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-2xp mb-2 my-auto font-bold">
                {detailsPanel.rightTitle}
              </h3>
              <Button {...detailsPanel.rightButton} onClick={animation}>
                <i className="fa-solid fa-arrow-left"></i>{' '}
                {detailsPanel.rightButton.children}
              </Button>
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
  updateCompanyRegisterView: PropTypes.func,
  isCompanyRegisterView: PropTypes.bool,
};
