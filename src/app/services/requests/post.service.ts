import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PostModel } from 'src/app/model/post/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  loadedPosts: PostModel[] = [];
  error = new Subject<string>();
  isFetching = false;
  dbLink: string =
    'https://ng-complete-guide-111f9-default-rtdb.europe-west1.firebasedatabase.app/';

  postMethod: string = 'posts.json';
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: PostModel = {
      title: title,
      content: content,
    };
    this.http
      .post<{ name: string }>(this.dbLink + this.postMethod, postData, {
        observe: 'response',
      })
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts(): Observable<PostModel[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: PostModel }>(this.dbLink + this.postMethod, {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello',
        }),
        // params: new HttpParams().set('print', 'pretty'),
        params: searchParams,
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          const postArray: PostModel[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
        catchError((errorRes) => {
          //Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(this.dbLink + '.json', {
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // console.log(event.type);
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
