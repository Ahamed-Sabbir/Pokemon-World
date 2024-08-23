import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataShareServiceService } from '../../services/data-share-service.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent implements OnDestroy {
  pokemon: any;
  subscription: Subscription;

  constructor(private dataShareService: DataShareServiceService){
    this.subscription = dataShareService.data.subscribe(
      (data) => (this.pokemon = data)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
