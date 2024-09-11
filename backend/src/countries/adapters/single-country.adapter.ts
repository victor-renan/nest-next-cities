import { BorderCountry } from '../entity/border-country';
import { DetailedCountry } from '../entity/detailed-country';
import { PopulationData } from '../entity/population-data';

export class SingleCountryAdapter {
  constructor(
    private readonly country?: any,
    private readonly population?: { data: { populationCounts: any } },
    private readonly flag?: any,
  ) { }

  convert(): DetailedCountry {
    return {
      commonName: this.country?.commonName,
      officialName: this.country?.officialName,
      countryCode: this.country?.countryCode,
      flag: this.flag?.data.flag,
      borders: this.country?.borders.map((item: any) => {
        return {
          commonName: item.commonName,
          officialName: item.officialName,
          countryCode: item.countryCode,
        } satisfies BorderCountry;
      }),
      populationData: this.population?.data.populationCounts?.map((item: any) => {
        return {
          year: item.year,
          value: item.value,
        } satisfies PopulationData;
      }),
    } satisfies DetailedCountry;
  }
}
