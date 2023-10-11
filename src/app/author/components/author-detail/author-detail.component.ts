import { Component } from '@angular/core';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent {

  authors: Author[];
  filteredArray: Author[];
  subscription: Subscription;
  searchName: string;
  sorted = false;
  viewSize: number;
  currentPage: number;
  
  author: Author;
  id: number;


  constructor(
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    this.loadAuthors();
    this.activatedRoute.paramMap.subscribe((url) => {
      this.authorService.setAuthorId(+url.get('id'));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  } 
  
  loadAuthors() {
      this.subscription = this.authorService
        .loadAuthors()
        .subscribe((authors: Author[]) => {
          this.authors = authors;
          this.filteredArray = this.authors.slice();

        });
    }
    

    lipsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
}
