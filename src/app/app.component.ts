import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
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
  exists;

  constructor(private _af:AngularFire){}

  ngOnInit(){
    // this._af.database.object('/cuisines').subscribe(x => console.log("Object",x));
    // this._af.database.list('/cuisines').subscribe(x => console.log("list",x));
    this.cuisines = this._af.database.list('/cuisines',{
      query:{
        orderByValue:true
      }
    });
    this.restaurants = this._af.database.list('/restaurants',{
      query:{
        orderByChild:'rating',
        equalTo:5,
        limitToFirst:50
      }
    });
    
    this.exists = this._af.database.object('/restaurants/1/features/1');
    this.exists.take(1).subscribe(x => {
      if(x && x.$value) console.log("EXISTS");
      else console.log("NOT EXISTS")
      console.log(x);
    })
    
    // /restaurants
    // /restaurants-by-city/camberwell

    this._af.database.list('/restaurants').push({name:""})
    .then(x =>{
      // x.key
      let restaurant = {name: "My New Restaurant"};
      let update = {};
      update['restaurants/'+x.key]=restaurant;
      update['restaurants-by-city/camberwell/'+x.key]=restaurant;

      this._af.database.object('/').update(update);
    })

  }
}


//**************************************************************************************

// take function is use to unsubscribe

// Sorting by KEY, VALUE, CHILD


// this.restaurants = this._af.database.list('/restaurants',{
//       query:{
//         orderByChild:'address/city'
//       }
//     })
//     .map(restaurants => {
//       restaurants.map((restaurant) =>{
//        restaurant.featureTypes = [];
//        for (var f in restaurant.features){
//          restaurant.featureTypes.push(this._af.database.object('/features/'+f))
//        }     
//       });
//       return restaurants;
//     });





