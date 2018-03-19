import { Component, OnInit } from '@angular/core';
import { LostService } from "../../services/lost.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
lost: any;
baseUrl = environment.apiBase;
lostListError: string;

// Zoom level
zoom: number = 10;

// Start Position
lat: number = 42.825583;
lng: number = -71.018029;

// Values
markerName: string;
markerLat: string;
markerLng: string;
markerDraggable: string;

//Markers
markers: marker[] = [
  {
    name: "Company One",
    lat: 42.825583,
    lng: -71.018029,
    draggable: true
  },
  {
    name: "Company Two",
    lat: 42.868164,
    lng: -70.889071,
    draggable: true
  },
  {
    name: "Company Three",
    lat: 42.858279,
    lng: -70.930498,
    draggable: false
  }
]

  constructor(private myLostService: LostService) { }

  ngOnInit() {
  // loop through each dog in the database
  this.myLostService.getAllLostDogs()
  .subscribe(allTheLostDogs => {
    console.log("allTheLostDogs: ", allTheLostDogs)
      this.lost = allTheLostDogs;
      var that = this;
      allTheLostDogs.forEach(function(oneLostDog){
  
        var newMarker = {
          name:"Untitled",
          lat: oneLostDog.latitude,
          lng: oneLostDog.longitude,
          draggable: false
      }
      that.markers.push(newMarker);
      });
    },
    () => {
      this.lostListError = "Sorry, no lost dogs listed.";
    }
  );
 
  };
  // for each run a function that calls another function in your service
  // the function in the service needs to make an api call to the express app and find all the dogs and returns a list
  //in this component, receive the list, and loop through each dog and for each one do something like this:
  //  var newMarker = {
  //   name:"Untitled",
  //   lat: dog.lat,
  //   lng: dog.coords.lng,
  //   draggable: false
  // }
  


  clickedMarker(marker: marker, index: number){
    console.log('Clicked Marker: '+ marker.name + ' at index ' + index);
  }

  mapClicked($event: any){
    var newMarker = {
      name:"Untitled",
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }

    this.markers.push(newMarker);
  }

  markerDragEnd(marker: any, $event: any){
    console.log('dragEnd', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;
  }
  
  addMarker(){
    console.log('Adding Marker');
    if(this.markerDraggable = 'yes'){
      var isDraggable = true;
    } else {
      var isDraggable = false;
    }

    var newMarker = {
      name:this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }
    this.markers.push(newMarker);
  }


}

// Marker Type
interface marker{
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
