import { Injectable, Logger } from '@nestjs/common';
import { Country } from './entity/country.entity';
import { AvaliableCountriesAdapter } from './adapters/avaliable-countries.adapter';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, of } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { SingleCountryAdapter } from './adapters/single-country.adapter';
import { DetailedCountry } from './entity/detailed-country';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);
  constructor(private readonly httpService: HttpService) { }

  async avaliableCountries(): Promise<Country[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(process.env.AVALIABLE_COUNTRIES_URL).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.message);
          throw 'Failed to get avaliable countries';
        }),
      ),
    );

    return new AvaliableCountriesAdapter(data).convert();
  }

  async singleCountry(code: string): Promise<DetailedCountry> {
    console.log(code)
    const country = await firstValueFrom(
      this.httpService.get(`${process.env.SINGLE_COUNTRY_URL}/${code}`).pipe(
        catchError((err: AxiosError) => {
          this.logger.error(err.message);
          throw 'Failed to get the country info';
        }),
      ),
    );

    const requestConfig = {
      country: country.data.commonName,
    };

    const data = await Promise.all([
      firstValueFrom(
        this.httpService
          .post(process.env.SINGLE_POPULATION_URL, requestConfig)
          .pipe(
            catchError((err: AxiosError) => {
              this.logger.error(err.message);
              return of(null)
            }),
          ),
      ),
      firstValueFrom(
        this.httpService.post(process.env.SINGLE_FLAG_URL, requestConfig).pipe(
          catchError((err: AxiosError) => {
            this.logger.error(err.message);
            return of(null);
          }),
        ),
      ),
    ]);

    return new SingleCountryAdapter(
      country.data,
      data[0] && data[0].data,
      data[1] && data[1].data,
    ).convert();
  }
}
