import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../service/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit{


  public villes:any;

  public cinemas:any;
  public salles :any;
  public CurrentVille :any;
  public CurrentCinema :any;
  //private currentPlace: any;
  public currentProjection: any;
  public selectedTickets: any;

  constructor(public cinemaService:CinemaService) {
  }
  ngOnInit(): void {
    this.cinemaService.getVilles()
      .subscribe(data=>{
          this.villes=data;
    },err => {console.log(err)}
  )
  }



  OnGetCinema(v:any) :void {
    this.CurrentVille=v;
    this.salles=undefined;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
          this.cinemas=data;
        },err => {console.log(err)}
      )
  }

  OnGetSalles(c:any) :void {
    this.CurrentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
          this.salles=data;
          // @ts-ignore
        this.salles._embedded.salles.forEach(salle=>{
            this.cinemaService.getProjections(salle)
              .subscribe(data=>{
                  salle.projections=data;
                },err => {console.log(err)}
              )
          })
        },err => {console.log(err)}
      )
  }



  OnGetTcketesPlaces(p:any) {
    this.currentProjection=p;
    this.cinemaService.getTicketsPlaces(p)
      .subscribe(data=>{
        this.currentProjection.tickets=data;
        this.selectedTickets=[];
      },err => {console.log(err)}
    )


  }

  onSelectTicket(t: any) {
    if (!t.selected){
      t.selected=true;
      this.selectedTickets.push(t);
    }
    else{
      t.selected=false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t),1);
    }



  }

  getTicketClass(t: any) {
    let str="btn margin ";
    if (t.reserve==true){
      str+="btn-danger";
    }
    else if (t.selected){
      str+="btn-warning";

    }else {
      str+="btn-success";
    }
    return str;
  }


  onPayTickets(dataform:any) {

    let tickets: any[] =[];


    this.selectedTickets.forEach((t:any) => {
      tickets.push(t.id);
    })

    dataform.tickets=tickets;
    console.log(dataform);
    this.cinemaService.payerTickets(dataform)
      .subscribe((data:any)=>{
          alert("Tickets Reserves avec succes");
          this.OnGetTcketesPlaces(this.currentProjection);
        },(err:any) => {console.log(err)}
      )
  }
}
