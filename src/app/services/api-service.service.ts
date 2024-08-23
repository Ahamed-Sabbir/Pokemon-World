import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private httpClient: HttpClient) { }

  getPokemonDetails(pageNumber: number): Observable<any>{
    const url = `${this.baseUrl}?offset=${pageNumber * 20}&limit=20`;
    return this.fetchpokemon(url).pipe(
      switchMap((response) =>
        forkJoin(
          response.results.map((pokemon: any) => 
            this.fetchIndividualPokemonByName(pokemon.name)
          )
        )
      )
    );
  }

  fetchpokemon(url: string): Observable<any>{
    return this.httpClient.get<any>(url);
  }

  fetchIndividualPokemonByName(name: string): Observable<any>{
    const url = `${this.baseUrl}/${name}`;
    return this.fetchpokemon(url);
  }

}
