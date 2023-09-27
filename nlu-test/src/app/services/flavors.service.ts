import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlavorsService {
  ROOT_URL = 'http://localhost:80'

  constructor(private http: HttpClient) {

  }

  async GetCategories() {
    return new Promise(async resolve => {
      const flavors = await fetch(this.ROOT_URL + '/flavors').then(result => result.json()).catch(console.log)
      resolve(flavors);
    });
  }

  async GetFlavorsInCategory(categoryId: string): Promise<any[]> {
    return new Promise(async resolve => {
      const flavors = await fetch(this.ROOT_URL + '/flavors/' + categoryId).then(result => result.json())
      resolve(flavors);
    });
  }
}
