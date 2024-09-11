import { Country } from '../entity/country.entity';

export class AvaliableCountriesAdapter {
  constructor(private readonly data?: object) {}

  convert(): Country[] {
    return Object.values(this.data ?? {}).map((item) => {
      return {
        countryName: item.name,
        countryCode: item.countryCode,
      } satisfies Country;
    });
  }
}
