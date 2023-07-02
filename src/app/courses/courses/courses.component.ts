import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>;

  displayedColumns = ['name','category', 'actions'];

  //coursesService: CoursesService;
  constructor(private _coursesService: CoursesService,
      public dialog: MatDialog,
      private router: Router,
      private route: ActivatedRoute
    ){
    //this.coursesService = new CoursesService();
    this.courses$ = this._coursesService.list().pipe(
      catchError(error => {
        this.onError(error.message)
        return of([])  //retorna um observable de um array vazio caso haja erros
      })
    );
  }

  onAdd(){
    console.log('onAdd')
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onError(errorMessage: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    })
  }

}
