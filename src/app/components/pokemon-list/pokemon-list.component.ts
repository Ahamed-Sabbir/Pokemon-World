import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataShareServiceService } from '../../services/data-share-service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit{ // lifecyle method OnInit

  currentPageNumber: number = 0;
  pokemonDetails: any[] = [];

  constructor(
    private apiService: ApiServiceService, 
    private route: ActivatedRoute,
    private router: Router,
    private dataShareService: DataShareServiceService,
  ){
    this.currentPageNumber=0;
    this.pokemonDetails=[];
  }
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParamMap: any) => {
      if (queryParamMap.has('pokemon')) {
        this.loadSinglePokemonDetails(queryParamMap.get('pokemon'));
      } else {
        this.setCurrentPageNum(queryParamMap);
        this.loadAllPokemonDetails();
      }
    });
  }

  setCurrentPageNum(queryParamMap: any): void{
    this.currentPageNumber = queryParamMap.has('page') ? queryParamMap.get('page') : 0;
  }

  loadAllPokemonDetails(): void{
    this.apiService.getPokemonDetails(this.currentPageNumber).subscribe({ // Observable must have to be subscribed
      next: (successResponse) => (this.pokemonDetails=successResponse),
      error: (errorResponse) => console.error(errorResponse)
    });
  }

  loadSinglePokemonDetails(name: string) {
    this.apiService.fetchIndividualPokemonByName(name).subscribe({
      next: (result) =>
        this.pokemonDetails.splice(0, this.pokemonDetails.length, result),
      error: (error) => console.error(error),
    });
  }

  loadPerviousPage(): void{
    this.router.navigate(['/pokemon-list'], {
      queryParams: {page: --this.currentPageNumber},
    });
  }

  loadNextPage(): void{
    this.router.navigate(['/pokemon-list'], {
      queryParams: {page: ++this.currentPageNumber},
    });
  }

  viewDetails(pokemon: any): void {
    this.dataShareService.sendData(pokemon);
    this.router.navigate(['/pokemon-details']);
  }

}
