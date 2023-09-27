import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  // the base url of the server.
  ROOT_URL = 'http://localhost:80'

  constructor() {

  }

  /**
   * CallServer
   * @description Makes a call to the server to get flavor information.
   * @param path The path on the server API to call
   * @param method The HTTP method to call with
   * @param body The body of data, if it is sent.
   * @returns 
   */

  async CallServer(path, method = 'GET', body = null): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(this.ROOT_URL + path, {
        method: method,
        body: body
      })
        .then(result => result.json())
        .catch(err => reject('Failed to fetch! Is the server running? Error: ' + err))
      resolve(result);
    })
  }

  async GetCategories(): Promise<any[]> {
    return this.CallServer('/flavors')
  }

  async GetFlavorsInCategory(categoryId: string): Promise<any[]> {
    return this.CallServer('/flavors/' + categoryId);
  }

  async SubmitForm(data: FormData): Promise<any> {
    return this.CallServer('/quote', 'POST', data);
  }
}
