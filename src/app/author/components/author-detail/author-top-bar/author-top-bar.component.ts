import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Author } from 'src/app/author/models/author.model';
import { AuthorService } from 'src/app/author/services/author.service';

@Component({
  selector: 'app-author-top-bar',
  templateUrl: './author-top-bar.component.html',
  styleUrls: ['./author-top-bar.component.css']
})
export class AuthorTopBarComponent {
  @Input() author: Author;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit() {
      const id = +this.route.snapshot.params['id'];
  
      this.authorService.loadAuthor(id).subscribe((author: Author) => {
        this.author = author;
      });
    }

  deleteAuthor() {
    const confirmation = window.confirm(
      `Da li ste sigurni da želite da izbrišete autora ${this.author?.name} ${this.author?.surname}?`
    );

    if (confirmation) {
      this.authorService.deleteAuthor(this.author.id).subscribe(() => {
        this.router.navigate(['/authors']);
      });
    }
  }
}
