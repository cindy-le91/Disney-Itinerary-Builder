import { useEffect } from 'react';
import Tabs from './Tabs.js';
import CinderellaCastle from './disneyicons/WDWicon_CinderellaCastle.svg';
import MillenniumFalcon from './disneyicons/WDWicon_MillenniumFalcon.svg';
import ExpeditionEverest from './disneyicons/WDWicon_ExpeditionEverest.svg';
import SpaceMountain from './disneyicons/WDWicon_SpaceMountain.svg';
import Entrance from './disneyicons/WDWicon_MagicKingdomEntrance.svg';
import Tree from './disneyicons/WDWicon_TreeofLife.svg';
import LogRide from './disneyicons/DLPicon_SplashMountain.svg';
import MickeyIceCream from './disneyicons/DLPicon_MickeyIceCream.svg';
import TowerofTerror from './disneyicons/WDWicon_TowerofTerror.svg';
import Monorail from './disneyicons/WDWicon_Monorail.svg';

export default function Dining(props) {
  const { dining, openModal, onSelectAttraction, location } = props;

  function handleClick() {
    openModal();
    onSelectAttraction(dining);
  }

  return (
    <div>
      <div
        className="row border-bottom"
        style={{
          height: '100px',
        }}>
        <div
          className="col-2"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {location === 'Fantasyland' && (
            <img
              alt="cinderella castle"
              src={CinderellaCastle}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === "Star Wars: Galaxy's Edge" && (
            <img
              alt="millenium falcon"
              src={MillenniumFalcon}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Frontierland' && (
            <img
              alt="expedition everest"
              src={ExpeditionEverest}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Tomorrowland' && (
            <img
              alt="space mountain"
              src={SpaceMountain}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Main Street, U.S.A.' && (
            <img
              alt="entrance"
              src={Entrance}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Adventureland' && (
            <img
              alt="tree"
              src={Tree}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Critter Country' && (
            <img
              alt="log ride"
              src={LogRide}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === "Mickey's Toontown" && (
            <img
              alt="mickey ice cream"
              src={MickeyIceCream}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'New Orleans Square' && (
            <img
              alt="tower of terror"
              src={TowerofTerror}
              style={{ width: '60px', height: '60px' }}></img>
          )}
          {location === 'Disneyland Park' && (
            <img
              alt="monorail"
              src={Monorail}
              style={{ width: '60px', height: '60px' }}></img>
          )}
        </div>
        <div
          className="col-8"
          style={{
            fontSize: '18px',
            paddingTop: '20px',
          }}>
          {dining.name}
          <br />
          <div style={{ fontSize: '16px', paddingTop: '5px' }}>{location}</div>
        </div>
        <div
          className="col-2"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <button
            onClick={handleClick}
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: '#C3CDE6',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <i className="bi bi-plus" style={{ fontSize: '24px' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
