import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;  // quantité d'événements sur une page // 

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
 
    const filteredEvents = (
    (!type
      ? data?.events  // si type est false (pas d'événemnt séléctionné) toutes les données s'affichent. // 
      : data?.events.filter((event) => event.type === type)) || [] // débug: data?.events) || [] . Je filtre les événements.//
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index && // Vérifie si l'index de l'événement est supérieur ou égal au premier événement de la page actuelle.
      PER_PAGE * currentPage > index // Vérifie si l'index de l'événement est inférieur à l'index du dernier événement de la page actuelle.


    ) {
      return true; // Si les deux conditions ci-dessus sont remplies, l'événement est conservé 
    }
    return false; // si non il est filtré.
  });
  
  
  const changeType = (evtType) => { 
    setCurrentPage(1); // après avoir changé le type d'événement, la liste d'événts commençara depuis la première page. //
    setType(evtType); // ceci change le type d'événement séléctionné pour activer le filtre d'événements. //
  };

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1; // número de página > redondea hacia abajo el resultado de la división entre el número de eventos por páginas (9) y el número de eventos filtrados. suma uno en el caso en que la cantidad de eventos no quepan en la página.
  const typeList = new Set(data?.events.map((event) => event.type)); // new set crea un conjunto a partir del arreglo de tipos de eventos. Un conjunto es una estructura de datos que solo contiene valores únicos, por lo que elimina duplicados automáticamente. luego mapea data.events y se filtra la propiedad types.
  // acá obtiene event.type

   return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}  /* esta es la lista de imputs en la que elegimos el tipo de evento */ 
            onChange={(value) => (value ? changeType(value) :  changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
