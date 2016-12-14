import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  cuisines : FirebaseListObservable<any[]>;
  restaurants : Observable<any[]>;

  constructor(private _af:AngularFire){}

  ngOnInit(){
    // this._af.database.object('/cuisines').subscribe(x => console.log("Object",x));
    // this._af.database.list('/cuisines').subscribe(x => console.log("list",x));
    this.cuisines = this._af.database.list('/cuisines');
    this.restaurants = this._af.database.list('/restaurants')
    .map(restaurants => {
      restaurants.map((restaurant) =>{
       restaurant.featureTypes = [];
       for (var f in restaurant.features){
         restaurant.featureTypes.push(this._af.database.object('/features/'+f))
       }     
      });
      return restaurants;
    });
  }
}


//**************************************************************************************




