import PropTypes from "prop-types"; // bibliothèque: permet de spécifier le type de props qu'on utilise: PropTypes.string/PropTypes.number/PropTypes.bool et aussi .isrequired pour faire que la prop soit obligatoire.//
import {
  createContext, // Les contexts permettent de passer de données par l'arbre de composants sans le faire manuelemet à chaque fois.//
  useCallback,
  useContext, // pour acceder aux données du context
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData()
    );
    } catch (err) {
      setError(err);
    }
  }, []);
  
  useEffect(() => {
    if (data) return;
    getData();
  });

  const events = data?.events;
  events?.sort((evtA, evtB) =>
  new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const last = events && [...events].slice(-1)[0]; // copie de l'array avae un seul élément (le dernier) auquel on accède avec [0] //
  
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
