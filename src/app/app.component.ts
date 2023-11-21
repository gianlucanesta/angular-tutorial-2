import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  dbLink: string =
    'https://ng-complete-guide-111f9-default-rtdb.europe-west1.firebasedatabase.app/';

  postMethod: string = 'posts.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http
      .post(this.dbLink + this.postMethod, postData)
      .subscribe((responseData) => {
        // console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get(this.dbLink + this.postMethod).subscribe((posts) => {
      console.log(posts);
    });
  }
}
