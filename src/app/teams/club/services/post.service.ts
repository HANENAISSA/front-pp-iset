import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http:HttpClient) { }

  getposts(idclub:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/post/getposts",   {

         idclub:idclub
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );

  }
  addpost(file:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/post/addpost",    file ,
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  addComment(id_publication:any,description:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/post/addComment",   {


        id_publication:id_publication,
        description:description,
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  getComments(idpublication:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/post/getComments",   {

         idpublication:idpublication
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }
  // 127.0.0.1:5010/post/deletePost  id_publication ou token
  deletePost(id_publication:any){
    return this._http.post<any>(
      "http://127.0.0.1:5010" + "/post/deletePost",   {

        id_publication:id_publication
      },
      {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
      );
  }

 //  127.0.0.1:5010/post/deleteComment  id_commentaire ou token
 deleteComment(id_commentaire:any){
  return this._http.post<any>(
    "http://127.0.0.1:5010" + "/post/deleteComment",   {

      id_commentaire:id_commentaire,
    },
    {headers:{'authorization':`Bearer ${localStorage.getItem('token')}`}}
    );
}
}
