

import { useEffect, useState } from "react";
import { Row, Col, Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const apiKey = "71aa2fd4d167c8605dff994169fcdc91";

function MyHomePage({ city }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const [todayRes, forecastRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
          ),
        ]);

        const todayData = await todayRes.json();
        const forecastData = await forecastRes.json();

        if (todayData.cod === 200 && forecastData.cod === "200") {
          setWeather(todayData);

          const dailyForecasts = forecastData.list.filter((entry) =>
            entry.dt_txt.includes("12:00:00")
          );
          setForecast(dailyForecasts.slice(0, 5));
        } else {
          setWeather(null);
          setForecast([]);
          console.error("Errore nella risposta API");
        }
      } catch (error) {
        setWeather(null);
        setForecast([]);
        console.error("Errore nella fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={5} className="p-4 my-3 border rounded text-center mx-2 shadow weather-box">
        {loading ? (
          <Spinner animation="border" />
        ) : weather ? (
          <>
          <h2>Previsioni Odierne</h2>
            <h3>
              {weather.name}, {weather.sys.country}
            </h3>
            <p className="lead">{weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Icona meteo"
            />
            <h3>{Math.round(weather.main.temp)}°C</h3>
          </>
        ) : (
          <p>Errore nel caricamento meteo</p>
        )}
      </Col>

      <Col xs={12} md={5} className="p-4 my-3 border rounded text-center mx-2 shadow weather-box">
        <h2 className="mb-3">Prossimi 5 giorni</h2>
        {forecast.length > 0 ? (
          forecast.map((day, index) => {
            const dayString = day.dt_txt.split(" ")[0];
            return (
              <Card key={index} className="mb-2">
                <Link
                  to={`/details/${dayString}`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Body>
                    <Card.Title>
                      {new Date(day.dt_txt).toLocaleDateString("it-IT", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                      })}
                    </Card.Title>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="Icona meteo"
                    />
                    <p className="mb-0">{day.weather[0].description}</p>
                    <strong>{Math.round(day.main.temp)}°C</strong>
                  </Card.Body>
                </Link>
              </Card>
            );
          })
        ) : (
          <p>Nessuna previsione trovata</p>
        )}
      </Col>
    </Row>
  );
}

export default MyHomePage;
