import { useEffect, useState } from "react";
import { Row, Col, Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const apiKey = "71aa2fd4d167c8605dff994169fcdc91";
const otherCities = ["Tokyo", "Moscow", "Beijing", "Berlin"];

function MyHomePage({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Forecast per la colonna di destra (dipende da selectedCityForForecast)
  const [forecast, setForecast] = useState([]);
  const [loadingForecast, setLoadingForecast] = useState(true);

  // Meteo "altre città"
  const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);
  const [loadingOthers, setLoadingOthers] = useState(true);

  // Stato città selezionata per i dettagli forecast a destra (inizialmente city)
  const [selectedCityForForecast, setSelectedCityForForecast] = useState(city);

  // Aggiorna selectedCityForForecast se cambia la city principale (es. dalla ricerca)
  useEffect(() => {
    setSelectedCityForForecast(city);
  }, [city]);

  // Fetch meteo città principale (colonna sinistra)
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const todayRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const todayData = await todayRes.json();

        if (todayData.cod === 200) {
          setWeather(todayData);
        } else {
          setWeather(null);
          console.error("Errore nella risposta API meteo città principale");
        }
      } catch (error) {
        setWeather(null);
        console.error("Errore nella fetch meteo città principale:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  // Fetch previsioni 5 giorni per la città selezionata a destra
  useEffect(() => {
    const fetchForecast = async () => {
      setLoadingForecast(true);
      try {
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCityForForecast}&appid=${apiKey}&units=metric`
        );
        const forecastData = await forecastRes.json();

        if (forecastData.cod === "200") {
          const dailyForecasts = forecastData.list.filter((entry) =>
            entry.dt_txt.includes("12:00:00")
          );
          setForecast(dailyForecasts.slice(0, 5));
        } else {
          setForecast([]);
          console.error("Errore nella risposta API forecast");
        }
      } catch (error) {
        setForecast([]);
        console.error("Errore nella fetch forecast:", error);
      } finally {
        setLoadingForecast(false);
      }
    };

    fetchForecast();
  }, [selectedCityForForecast]);

  // Fetch meteo per le altre città (colonna sinistra)
  useEffect(() => {
    const fetchOtherCities = async () => {
      setLoadingOthers(true);
      try {
        const requests = otherCities.map((cityName) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
          ).then((res) => res.json())
        );

        const results = await Promise.all(requests);
        const filteredResults = results.filter((r) => r.cod === 200);
        setOtherCitiesWeather(filteredResults);
      } catch (error) {
        setOtherCitiesWeather([]);
        console.error("Errore fetch altre città:", error);
      } finally {
        setLoadingOthers(false);
      }
    };

    fetchOtherCities();
  }, []);

  return (
    <Row className="justify-content-center">
      <Col
        xs={12}
        md={5}
        className="p-4 my-3 border rounded text-center mx-2 shadow weather-box"
      >
        <h2>Previsioni Odierne</h2>

        {loading ? (
          <Spinner animation="border" />
        ) : weather ? (
          <>
            <Card className="glass-card mb-3">
              <Card.Body>
                <h4>
                  {weather.name}, {weather.sys.country}
                </h4>
                <p>{weather.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Icona meteo"
                />
                <strong>{Math.round(weather.main.temp)}°C</strong>
              </Card.Body>
            </Card>

            {loadingOthers ? (
              <Spinner animation="border" />
            ) : (
              otherCitiesWeather.map((cityWeather) => (
                <Card
                  key={cityWeather.id}
                  className="glass-card mb-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedCityForForecast(cityWeather.name)}
                >
                  <Card.Body>
                    <h4>
                      {cityWeather.name}, {cityWeather.sys.country}
                    </h4>
                    <p>{cityWeather.weather[0].description}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                      alt="Icona meteo"
                    />
                    <strong>{Math.round(cityWeather.main.temp)}°C</strong>
                  </Card.Body>
                </Card>
              ))
            )}
          </>
        ) : (
          <p>Errore nel caricamento meteo</p>
        )}
      </Col>

      <Col
        xs={12}
        md={5}
        className="p-4 my-3 border rounded text-center mx-2 shadow weather-box"
      >
        <h2 className="mb-3">Previsioni 5 giorni - {selectedCityForForecast}</h2>
        {loadingForecast ? (
          <Spinner animation="border" />
        ) : forecast.length > 0 ? (
          forecast.map((day, index) => {
            const dayString = day.dt_txt.split(" ")[0];
            return (
              <Card key={index} className="mb-2 glass-card">
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
