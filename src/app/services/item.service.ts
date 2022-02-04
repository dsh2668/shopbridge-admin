import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';

@Injectable({
	providedIn: 'root'
})
export class ItemService {

	constructor(
		private http: HttpClient
	) { }

	getItems(): Promise<any> {
		return this.http.get(AppConfig.settings.baseURL + '/shopbridge-products/items')
			.toPromise()
			.then(response => response as any)
			.catch(this.handleError);
	}

	getItemDetails(id: string): Promise<any> {
		return this.http.get(AppConfig.settings.baseURL + '/shopbridge-products/items/' + id)
			.toPromise()
			.then(response => response as any)
			.catch(this.handleError);
	}

	saveItem(itemBody: any): Promise<any> {
		return this.http.post(AppConfig.settings.baseURL + '/shopbridge-products/items', itemBody)
			.toPromise()
			.then(response => response as any)
			.catch(this.handleError);
	}

	updateItem(itemID: string, itemBody: any): Promise<any> {
		return this.http.put(AppConfig.settings.baseURL + '/shopbridge-products/items/' + itemID, itemBody)
			.toPromise()
			.then(response => response as any)
			.catch(this.handleError);
	}

	deleteItem(itemID: string): Promise<any> {
		return this.http.delete(AppConfig.settings.baseURL + '/shopbridge-products/items/' + itemID)
			.toPromise()
			.then(response => response as any)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('Error : ' + error);
		return Promise.reject(error.message || error);
	}

}
