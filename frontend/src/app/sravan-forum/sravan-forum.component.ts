// Developed by  Ajith Jayanthi B00825322 aj788769@dal.ca  
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from '../auth.sevice';
import { DiscussionforumService } from '../discussionforum.service';
import {formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

export interface Forumdata {
  title: string;
  replies: number;
  author: string;
  time: string;
}

@Component({
  selector: 'app-sravan-forum',
  templateUrl: './sravan-forum.component.html',
  styleUrls: ['./sravan-forum.component.scss']
})
export class SravanForumComponent  {
  isPostQuestion:boolean=false;
  isuserloggedin:boolean=false;
  imageSrc:string="";
  current_data= new Date();
  userId: string;
  current_User: any;
  discussion_forum={};
  todays_date:String="";
  discussion_data:any;
  selected_discussion:any;
  featured_discussion:any;
  show_discussion_forum:boolean=false;
  discussionForum = new FormGroup({
    question: new FormControl('', [Validators.required]),
    title : new FormControl('',[Validators.required]),
    image : new FormControl('',[Validators.required])
  });
  replyForum = new FormGroup({
    reply: new FormControl('', [Validators.required])
  });
  constructor(private toastr: ToastrService,private discussionforumService: DiscussionforumService,private authService: AuthService ) { }
  ngOnInit() {
    this.initializevariables();
    this.todays_date = formatDate(this.current_data, 'dd MMMM yyyy', 'en-US');
    this.discussion_forum={};
    this.selected_discussion={};
    this.featured_discussion=[];
    this.userId = this.authService.getUserId();
    if(this.userId == undefined){
      this.isuserloggedin=false;
    }
    else{
      this.isuserloggedin=true;
    }
    //Service call to get the discussion forum threads
    this.discussionforumService.getDiscussionForum().subscribe(discussion_data =>{
      this.discussion_data=discussion_data;
      this.featuredpost();
    });
    this.authService.getUserById(this.userId).subscribe(currentUser => {
      this.current_User = currentUser; 
    });
  }
  initializevariables(){
    this.isPostQuestion=false;
    this.show_discussion_forum=false;
  }
  askAQuestion(){
    this.isPostQuestion = this.isPostQuestion ? false : true;
  }
  //Posting a new discussion thread
  onPost(){
  
    this.discussion_forum={
      title:this.discussionForum.get('title').value,
      description:this.discussionForum.get('question').value,
      image:this.imageSrc,
      time:this.todays_date,
      repliesCount:0,
      uid:this.userId,
      firstName:this.current_User["firstName"],
      lastName:this.current_User["lastName"]
    }
    this.discussionforumService.createNewForum(this.discussion_forum);
    this.discussionForum.reset();
    setTimeout(() => 
  {
    this.initializevariables();
    this.discussionforumService.getDiscussionForum().subscribe(discussion_data =>{
      this.discussion_data=discussion_data;
    });
  },
    3000);
  }

  //Image conversion to base 64
  //Code taken from aadesh shah product listing page to maintain uniqueness
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    
  }
  //To open a specific discussion forum
  open_discussion(id){

    for(var data in this.discussion_data){
      if(this.discussion_data[data]._id==id){
        this.selected_discussion=this.discussion_data[data];
        this.show_discussion_forum=true;
        break;
      }
      
    }
  }
  showhomediscussion(){
    this.show_discussion_forum = this.show_discussion_forum ? false : true;
  }
  //To update a new reply for a discussion forum
  post_reply(id){
    for(var data in this.discussion_data){
      if(this.discussion_data[data]._id==id){
       var discussion_data={
          firstName:this.current_User["firstName"],
          lastName:this.current_User["lastName"],
          reply:this.replyForum.get('reply').value,
          time:this.todays_date,
          upvotes:0,
          downvotes:0,
          id:id
        }
        this.discussion_data[data].discussions.push(discussion_data);
        this.discussionforumService.newDiscussionReply(this.discussion_data[data]);
        this.replyForum.reset();
        this.toastr.success('', 'comment posted successfully', {
          timeOut: 1000,
          closeButton: true,
          progressBar: true
        });
        break;
      }
    }
  }
  //To update the number of counts
  update_votes_count(votetype,id,replynumber){
    if(this.isuserloggedin){
    for(var data in this.discussion_data){
      if(this.discussion_data[data]._id==id){
        if(votetype ==="upvote"){
        this.discussion_data[data].discussions[replynumber].upvotes=this.discussion_data[data].discussions[replynumber].upvotes+1;
        }
        else{
          this.discussion_data[data].discussions[replynumber].downvotes=this.discussion_data[data].discussions[replynumber].downvotes+1;
        }
        this.discussionforumService.newDiscussionReply(this.discussion_data[data]);
        break;
      }
    }
  }
  else{
    this.toastr.error('', 'Please login to vote', {
      timeOut: 1000,
      closeButton: true,
      progressBar: true
    });
  }
  }
  discussionnotexist(discussion){
    for(var data of this.featured_discussion){
      if(data.id == discussion._id){
        return false;
      }
    }
    return true;
  }
  //To indentify the featured posts
  featuredpost(){
    var sortedarray=[];
    this.featured_discussion=[];
    for(var index in this.discussion_data){
      sortedarray[sortedarray.length]=this.discussion_data[index].discussions.length;
    }
    sortedarray.sort().reverse();
    for(var data of sortedarray){
      if(this.featured_discussion.length == 3){
        break;
      }
      for(var forum of this.discussion_data){
        if(data == forum.discussions.length && this.discussionnotexist(forum)){
          this.featured_discussion.push(
            {
              id: forum._id,
              title:forum.title
            }
          );
          break;
        }
      }
    }
  }
}
