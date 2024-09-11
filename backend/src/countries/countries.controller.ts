import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Country } from './entity/country.entity';
import { CountryService } from './countries.service';
import { DetailedCountry } from './entity/detailed-country';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountries(): Promise<Country[]> {
    try {
      return await this.countryService.avaliableCountries();
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':code')
  async getSingleCountry(
    @Param('code') code: string,
  ): Promise<DetailedCountry> {
    try {
      return await this.countryService.singleCountry(code);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
