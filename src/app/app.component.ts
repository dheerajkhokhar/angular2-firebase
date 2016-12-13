import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  cuisines : FirebaseListObservable<any[]>;
  restaurant;

  constructor(private _af:AngularFire){}

  ngOnInit(){
  //  this.subscription = this._af.database.list('/cuisines').subscribe((x) => {
  //     this.cuisines = x;
  //     console.log(this.cuisines);
  //   })

    this.cuisines = this._af.database.list('/cuisines');
    this.restaurant = this._af.database.object('/restaurant');
  }

  add() {
    this.cuisines.push('Asian');
  }

  update(){
    this._af.database.object('/restaurant').set({
      name: 'New Name',
      rating: 5
    })
  }
}
