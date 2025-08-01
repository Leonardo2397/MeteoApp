

import { useEffect, useState } from "react";
import { Card, Spinner, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

const apiKey = "71aa2fd4d167c8605dff994169fcdc91";

function DayWeatherDetails({ city }) {
  const { date } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city || !date) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        if (data.cod === "200") {
          // Filtra tutti i dati della giornata selezionata
          const dayDetails = data.list.filter((item) =>
            item.dt_txt.startsWith(date)
          );
          setDetails(dayDetails);
        } else {
          setDetails([]);
          console.error("Errore nel recupero dettagli meteo");
        }
      } catch (error) {
        setDetails([]);
        console.error("Errore fetch dettagli meteo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [city, date]);

  if (loading) return <Spinner animation="border" />;

  if (!details.length)
    return <p>Dettagli meteo non disponibili per la città: {city} nella data: {date}</p>;

  return (
    <Card className="m-3 p-3 shadow">
      <Card.Body>
        <Card.Title>
          Dettagli meteo per {city} il {date}
        </Card.Title>

        <ListGroup>
          {details.map((item) => (
            <ListGroup.Item key={item.dt}>
              <strong>{new Date(item.dt_txt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong> —{" "}
              {item.weather[0].description}, {Math.round(item.main.temp)}°C, umidità {item.main.humidity}%, vento {item.wind.speed} m/s
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="Icona meteo"
                style={{ marginLeft: "10px" }}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default DayWeatherDetails;
