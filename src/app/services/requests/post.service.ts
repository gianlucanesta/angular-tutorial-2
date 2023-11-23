import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
      .post<{ name: string }>(this.dbLink + this.postMethod, postData)
      .subscribe(
        (responseData) => {
          // console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: PostModel }>(this.dbLink + this.postMethod)
      .pipe(
        map((responseData) => {
          const postArray: PostModel[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      );
  }

  deletePosts() {
    return this.http.delete(this.dbLink + '.json');
  }
}
