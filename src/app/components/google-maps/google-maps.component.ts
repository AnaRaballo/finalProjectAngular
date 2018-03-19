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
zoom: number = 5;

// Start Position
lat: number = 42.825583;
lng: number = -71.018029;

// Values
markerLocation: string;
markerLat: string;
markerLng: string;
markerDraggable: string;

//Markers
markers: marker[] = []

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
          location: oneLostDog.location,
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

  clickedMarker(marker: marker, index: number){
    console.log('Clicked Marker: '+ marker.location + ' at index ' + index);
  }

  // mapClicked($event: any){
  //   var newMarker = {
  //     name:"Untitled",
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: false
  //   }

  //   this.markers.push(newMarker);
  // }

  markerDragEnd(marker: any, $event: any){
    console.log('dragEnd', marker, $event);

    var updMarker = {
      location: marker.location,
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
      location:this.markerLocation,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }
    this.markers.push(newMarker);
  }
}

// Marker Type
interface marker{
  location?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
