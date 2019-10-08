import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscussionforumService {

  constructor(private http: HttpClient) { }

  createNewForum(forumData:any){
    this.http.post('api/forums/',forumData)
    .subscribe(responseData => {
      console.log(responseData);
    });
  }
  getDiscussionForum(){
    return this.http.get('api/forums/discussionforums');
  }
  newDiscussionReply(reply:any){
    this.http.put('api/forums/reply',reply)
    .subscribe(responseData => {
      console.log(responseData);
    });
  }
}
