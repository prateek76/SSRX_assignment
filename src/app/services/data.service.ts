import { Injectable,  } from '@angular/core';
import { of } from 'rxjs';
import { BehaviorSubject  } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class dataManagement {

	constructor() { }

	dataSource: BehaviorSubject<Array<any>> = new BehaviorSubject([{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
		{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
		{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
		{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
		{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
		{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
		{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
		{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
		{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
		{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},]);
	dataSource$ = this.dataSource.asObservable();



	update(row){
		console.log('row',row);
		//console.log('in service datasource',this.dataSource)
		this.dataSource.forEach((item) =>{
			
			item.forEach((i,ind) => {
				//console.log('asgdn',i,ind)
				if(row['position'] == i['position'].toString()){
					item[ind]['name'] = row["name"]
					item[ind]['symbol'] = row["symbol"]
					item[ind]['weight'] = parseFloat(row["weight"])
				}
			})

			
		})
		//this.dataSource.next()
	}

	delete_data(row){
		console.log('row',row);
		let roomArr: any[] = this.dataSource.getValue();
		roomArr.forEach((item, index) => {
				if(row['position'] == item['position'].toString()) { 
					roomArr.splice(index, 1); 
				}
			});
		this.dataSource.next(roomArr);
	}

	add_data(row){
		delete row['edit'];
		console.log('add',row);
		if(this.validatedata(row)){
			let roomArr: any[] = this.dataSource.getValue();
			let max_ = -1;
			roomArr.forEach((item, index) => {
					if(item['position'] >max_) { 
					max_ = item['position']; 
					}
				});
			row['position'] = max_+1
			this.dataSource.next(this.dataSource.getValue().concat([row]));
		}
		else{
			alert('wrong data')
		}
	}

	validatedata(row){
		console.log(typeof row['name'],typeof parseFloat(row['weight']),typeof row['symbol'])

		if (typeof row['name'] == 'string' && 
					row['name'] &&
					!isNaN(row['weight']) && 
					row['weight'] &&
					typeof row['symbol'] =='string' && 
					row['symbol']){
			return true;
		}else{
			return false;
		}
	}
}