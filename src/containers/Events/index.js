import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;  // cantidad de eventos por página / el sitio parace estar en la página 12 // 

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
 
    const filteredEvents = (
    (!type
      ? data?.events  // si type da false (no hay ningún tipo de evento seleccionado) muestra todos los datos. // 
      : data?.events.filter((event) => event.type === type)) || []// acá habría que mostrar los eventos seleccionados. sintaxis dada : : data?.events) || [] //
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index && // verifica si el índice del elemento es mayor o igual al índice del primer elemento que debería mostrarse en la página actual, y la expresión //
      PER_PAGE * currentPage > index // verifica si el índice del elemento es menor que el índice del último elemento que debería mostrarse en la página actual. //
    ) {
      return true; // Si ambas condiciones son verdaderas, significa que el elemento event debería mostrarse en la página actual, por lo que la función de filtro devuelve true, //
    }
    return false;
  });
  
  
  const changeType = (evtType) => { // nuevo evento que se selecciona // debería poner acá el valor del onChange //
    setCurrentPage(1); // después de cambiar el tipo de evento, la lista de eventos volverá a comenzar desde la primera página. //
    setType(evtType); // Esto cambia el tipo de evento seleccionado, lo que probablemente afectará a la lista de eventos que se muestran en la página. //
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
