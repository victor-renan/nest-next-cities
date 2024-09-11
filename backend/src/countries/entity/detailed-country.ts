import { BorderCountry } from './border-country';
import { PopulationData } from './population-data';

export type DetailedCountry = {
  commonName: string;
  officialName: string;
  countryCode: string;
  borders: BorderCountry[] | null;
  populationData: PopulationData[];
  flag: string;
};
