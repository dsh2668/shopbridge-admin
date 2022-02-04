import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'searchValue'
})
export class SearchValuePipe implements PipeTransform {

    transform(items: any[], keys: string, searchTerm: string) {
        if (!items || !searchTerm) {
            return items;
        }

        return (items || []).filter(item => {
            return keys.split(',').some(key => item.hasOwnProperty(key) && (new RegExp(searchTerm, 'gi')).test(item[key]));
        });
    }

}