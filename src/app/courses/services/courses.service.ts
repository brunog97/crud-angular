import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../model/course';
import { Observable, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = '/assets/cursos.json';

  constructor(private _httpClient: HttpClient) { }

  list(): Observable<Course[]>{
    //return [ {_id: "1", name: "Angular", category: "fornt-end"}];
    return this._httpClient.get<Course[]>(this.API).pipe(
      //take(1), //servidor me deu resposta eu vou utlizar essa resposta finalizar inscrição na origem de dados
      first(), // interesse na primeira resposta do servidor - finalizar inscrição na origem de dados
      //delay(60000), // atraso de 60 segundos
      tap(courses => console.log(courses))
    );
  }

  save(record: Course) {
    return new Observable((observer) => {
      if (record != null){
        observer.next(record);
      }else{
        observer.error('Dados inválidos!')
      }
    });
  }
}
