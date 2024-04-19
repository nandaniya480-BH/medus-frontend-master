import React from 'react';
import Page from '../anatomy/Page';
import PageContent from '../components/containers/PageContent';
import CardLoginRegister from '../components/elements/cards/CardLoginRegister';

const cardloginregister = {
  color: 'primary',
  detailsPanel: {
    leftTitle: 'Registrieren Sie sich!',
    leftDescription: 'Erstellen Sie hier ihr eigenes medUS-Konto!',
    leftButton: {
      children: 'Registrieren',
      size: 'lg',
      outline: true,
      extraStyle: 'bg-white',
    },
    rightTitle: 'Willkommen zurück!',
    rightDescription: 'Loggen Sie sich in Ihr medUS-Konto ein!',
    rightButton: {
      children: 'Einloggen',
      size: 'lg',
      outline: true,
      extraStyle: 'bg-white',
    },
  },
  leftCard: {
    title: 'Einloggen',
    subtitle: 'Loggen Sie sich in Ihr medUS-Konto ein!',
    socials: [],
  },
  rightCard: {
    title: 'Registrieren',
    subtitle: 'Registrieren Sie sich als:',
    button: { children: 'Registrieren', color: 'primary', size: 'lg' },
    userRegister: { to: '/register?user', children: 'Arbeitnehmer (User)' },
    companyRegister: {
      to: '/register?company',
      children: 'Arbeitgeber (Firmen)',
    },
    inputs: [],
    socials: [],
  },
};

export default function LoginRegister() {
  return (
    <>
      <Page>
        <PageContent>
          <div className="bg-white-800 relative py-24 bg-cover bg-50 bg-radial-gradient">
            <h1 className="font-bold text-blueGray-800 text-center text-3xl">
              Einloggen
            </h1>
            <div className="py-12 container mx-auto px-4">
              <div className="flex flex-wrap -mx-4">
                <div className="mx-auto px-4 relative w-full lg:w-10/12">
                  <CardLoginRegister {...cardloginregister} />
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </Page>
    </>
  );
}
