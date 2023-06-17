import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  // https://backend-cinema-springboot-production.up.railway.app/  railway Deploiment
  // localhost   http://localhost:8082

  public host:string = "https://backend-cinema-springboot-production.up.railway.app"
  constructor(private http:HttpClient) { }

  public getVilles(){
      return this.http.get(this.host +"/villes")
  }


  // @ts-ignore
  getCinemas(v) {
    return this.http.get(v._links.cinemas.href)
  }

  // @ts-ignore
  getSalles(c) {
    return this.http.get(c._links.salles.href)
  }
  // @ts-ignore
  getProjections(salle) {
    let url= salle._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1")

  }




  // @ts-ignore
  getTicketsPlaces(p) {
    let url= p._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj")
  }

  payerTickets(dataform: any) {
    return this.http.post(this.host+"/payerTickets",dataform);
  }


}
