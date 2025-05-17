import React, { useState, useEffect } from 'react';
import './style.css';

const CityOptions = ({ cities }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </>
  );
};

const DatesOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      ))}
    </>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]); // Prázdné pole jako výchozí stav

  useEffect(() => {
    const fetchCities = async () => {
      try {
        console.log('Načítám města z API...');
        const response = await fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities');
        const json = await response.json();
        console.log('Data měst:', json);
        setCities(json.results);
      } catch (error) {
        console.error('Chyba při načítání měst:', error);
      }
    };

    const fetchDates = async () => {
      try {
        console.log('Načítám termíny z API...');
        const response = await fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates');
        const json = await response.json();
        console.log('Data termínů:', json);
        setDates(json.results);
      } catch (error) {
        console.error('Chyba při načítání termínů:', error);
      }
    };

    fetchCities();
    fetchDates();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Odesílám formulář s cestou');
    console.log('Odkud:', fromCity);
    console.log('Kam:', toCity);
    console.log('Datum:', date);

    if (onJourneyChange) {
      onJourneyChange({ fromCity, toCity, date });
    }
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
              <CityOptions cities={cities} />
            </select>
          </label>

          <label>
            <div className="journey-picker__label">Kam:</div>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <CityOptions cities={cities} />
            </select>
          </label>

          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <DatesOptions dates={dates} />
            </select>
          </label>

          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" alt="mapa spojů" />
      </div>
    </div>
  );
};