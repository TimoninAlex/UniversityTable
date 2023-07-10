import { Component } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

// Класс для отображения таблицы
export class Universities{
  constructor(
  public position: number,
  public countryName: string,
  public nameOfUniversity: string,
  public email: string)
  {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'UniversityTable';

  displayedColumns: string[] = ['position', 'countryName', 'nameOfUniversity', 'email'];

  dataSourceForTable!: Universities[];

  countryNameFilter: string = "";

  nameOfUniversityFilter: string = "";

  constructor(private http: HttpClient) {

  }

  //Кнопка "Показать" - Показывает 10 значений из списка, чтобы не перегружать
  async searchUniversity(){
    let dataList = Array.from(Array(length), () => {
      return new Universities(0, "", "", "");
    });

    //let params =  new HttpParams();
    //if(this.countryNameFilter || this.countryNameFilter !=="")
    //  params = params.set("country", this.countryNameFilter);
    //if(this.nameOfUniversityFilter || this.nameOfUniversityFilter !=="")
    //  params = params.set("name", this.nameOfUniversityFilter);

    let params = "search?";
    if((this.countryNameFilter || this.countryNameFilter !=="") && (this.nameOfUniversityFilter || this.nameOfUniversityFilter !==""))
      params += "country="+ this.countryNameFilter.replace(' ', '+') + "&name="+ this.nameOfUniversityFilter.replace(' ', '+');
    else if(this.countryNameFilter || this.countryNameFilter !=="")
      params += "country="+ this.countryNameFilter.replace(' ', '+');
    else if(this.nameOfUniversityFilter || this.nameOfUniversityFilter !=="")
      params += "name="+ this.nameOfUniversityFilter.replace(' ', '+');
      else
       params = "";

    this.http.get('http://universities.hipolabs.com/' + params).subscribe({next:(data:any) => {
        for(let i = 0; i<10 && i<data.length; i++) { 
          dataList[i] = new Universities(
            i+1,
            data[i].country,
            data[i].name,
            data[i].domains[0]
            );
        }
        this.dataSourceForTable = dataList;
      }
    });
  }
}
