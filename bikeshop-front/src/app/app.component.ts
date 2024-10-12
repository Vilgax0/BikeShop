import { Component,OnInit } from '@angular/core';
//import firestore to get data
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private firestore:AngularFirestore){

  }

  title = 'PruebaComponent';
  userList:any=[]

  ngOnInit(): void {
      //get data from firestore
      this.firestore.collection('usuarios').get().subscribe((data:any)=>{
        data.docs.array.array.forEach((docsdata:any) => {
          this.userList.push(docsdata.data())
        });
      })
  }

}
