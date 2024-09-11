export type Country = {
    countryName: string;
    countryCode: string;
  };

export type PopulationData = {
    year: number;
    value: number;
};

export type BorderCountry = {
    commonName: string;
    officialName: string;
    countryCode: string;
};

export type DetailedCountry = {
    commonName: string;
    officialName: string;
    countryCode: string;
    borders: BorderCountry[] | null;
    populationData: PopulationData[];
    flag: string;
};