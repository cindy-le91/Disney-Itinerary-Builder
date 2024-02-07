import React, { useRef, useState } from 'react';
import mapImage from './disneylandmap/DL-C.jpg';
import './Map.css';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [markers, setMarkers] = useState([
    // { matterhorn: { x: 1300, y: 800 } },
    // { waltdisneysenchantedtikiroom: { x: 900, y: 1200 } },
    // { pirateslairontomsawyerisland: { x: 530, y: 1100 } },
    // { splashmountain: { x: 250, y: 1050 } },
    // { null: { x: 1170, y: 170 } },
    // { frontierlandshootinexposition: { x: 850, y: 1020 } },
    // { rogerrabbitscartoonspin: { x: 1250, y: 220 } },
    // { millenniumfalconsmugglersrun: { x: 400, y: 270 } },
    // { bigthundermountainrailroad: { x: 740, y: 800 } },
    // { starwarsriseoftheresistance: { x: 60, y: 570 } },
    // { astroorbitor: { x: 1190, y: 1070 } },
    // { caseyjrcircustrain: { x: 990, y: 630 } },
    // { chipndaletreehouse: { x: 920, y: 170 } },
    // { findingnemosubmarinevoyage: { x: 1440, y: 870 } },
    // { disneylandmonorail: { x: 1500, y: 890 } },
    // { dumbotheflyingelephant: { x: 1050, y: 650 } },
    // { junglecruise: { x: 800, y: 1260 } },
    // { mainstreetcinema: { x: 1070, y: 1445 } },
    // { madteaparty: { x: 1190, y: 705 } },
    // { marktwainriverboat: { x: 690, y: 1050 } },
    // { peterpansflight: { x: 1070, y: 765 } },
    // { pinocchiosdaringjourney: { x: 1000, y: 750 } },
    // { piratesofthecaribbean: { x: 625, y: 1280 } },
    // { sailingshipcolumbia: { x: 690, y: 1020 } },
    // { sleepingbeautycastlewalkthrough: { x: 1010, y: 905 } },
    // { snowwhitesenchantedwish: { x: 1000, y: 780 } },
    // { storybooklandcanalboats: { x: 1210, y: 640 } },
  ]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const offsetX = event.clientX - dragStart.x;
    const offsetY = event.clientY - dragStart.y;

    const currentX = dragOffset.x + offsetX;
    const currentY = dragOffset.y + offsetY;

    mapContainerRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
    setDragOffset((prevState) => ({
      x: prevState.x + (event.clientX - dragStart.x),
      y: prevState.y + (event.clientY - dragStart.y),
    }));
  };

  const renderMarkers = () => {
    return markers.map((markerObj, index) => {
      const markerName = Object.keys(markerObj)[0];
      const markerCoords = markerObj[markerName];
      const { x, y } = markerCoords;

      const markerStyle = {
        left: x,
        top: y,
      };

      return (
        <div key={index} className="marker" style={markerStyle}>
          {markerName}
        </div>
      );
    });
  };

  return (
    <div>
      <p style={{ marginTop: '20px' }}>Note: This map is draggable</p>

      <div
        style={{ cursor: 'pointer' }}
        id="map-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        <div className="map-wrapper" ref={mapContainerRef}>
          <img
            src={mapImage}
            alt="Map"
            style={{ width: '1290px', height: 'auto' }}
          />
          {renderMarkers()}
        </div>
      </div>
    </div>
  );
};

export default Map;
