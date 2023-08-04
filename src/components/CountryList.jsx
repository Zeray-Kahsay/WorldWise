import { nanoid } from "nanoid";

import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((countryArr, currCity) => {
    if (
      !countryArr
        .map((countryObj) => countryObj.country)
        .includes(currCity.country)
    )
      return [
        ...countryArr,
        { country: currCity.country, emoji: currCity.emoji },
      ];
    else return countryArr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={nanoid()} />
      ))}
    </ul>
  );
}

export default CountryList;
