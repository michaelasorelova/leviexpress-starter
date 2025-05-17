import './style.css';
import { BusStop } from '../BusStop/BusStop';

export const JourneyDetail = ({ journey }) => {
  const stops = journey?.results?.stops;

  if (!stops) {
    return (
      <div className="journey-detail container">
        <h3>Podrobnosti cesty</h3>
        <p>Načítám data o cestě...</p>
      </div>
    );
  }

  return (
    <div className="journey-detail container">
      <h3>Podrobnosti cesty</h3>

      <div className="stops">
        {stops.map((stop) => (
          <BusStop
            key={stop.code}
            name={stop.name}
            station={stop.station}
            time={stop.time}
          />
        ))}
      </div>
    </div>
  );
};