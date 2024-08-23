import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', [Validators.required]],
    });
  }

  search(): void {
    if (this.searchForm.valid) {
      this.router
        .navigate(['/pokemon-list'], {
          queryParams: { pokemon: this.searchForm.get('searchTerm')?.value },
        })
        .finally(() => {
          this.searchForm.get('searchTerm')?.setValue('');
        });
    }
  }
}
