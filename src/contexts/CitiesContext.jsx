import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  //useState,
} from "react";

const CitiesContext = createContext();

// reducer
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((c) => c.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknow action type");
  }
}

const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  // FETCH all cities
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        //setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        //setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
        //console.log(data);
      } catch {
        dispatch({
          type: "rejected",
          payload: "Failed to load cities",
        });
        // alert("Failed to load cities!");
      }
      //finally {
      //   setIsLoading(false);
      // }
    }

    fetchCities();
  }, []);

  // GET one city by id
  async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      //setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      //setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Failed to load a city",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  // CREATE a city/ ADD a city
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      //setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      //setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch {
      //alert("Failed to CREATE city!");
      dispatch({ type: "rejected", payload: "Failed to CREATE city" });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  // DELETE a city
  async function deleteCity(id) {
    // the id we get from the url using useParams is always a string
    // and needs to be converted to a number
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });

    try {
      //setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      //setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch {
      //alert("Failed to DELETE data!");
      dispatch({ type: "rejected", payload: "Failed to DELETE a city" });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside CitiesProvider ");
  return context;
}

export { CitiesProvider, useCities };
