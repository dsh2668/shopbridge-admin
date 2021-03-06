import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'sortList'
})
export class SortListPipe implements PipeTransform {

    transform(items: any[], sortBy: string, ascending = true) {
        if (!items || !sortBy) {
            return items;
        }

        return items.sort((item1, item2) => {
            const fItem1 = isNaN(item1[sortBy]) ? (item1[sortBy] + '').toLowerCase() : item1[sortBy];
            const fItem2 = isNaN(item2[sortBy]) ? (item2[sortBy] + '').toLowerCase() : item2[sortBy];
            if (fItem1 < fItem2) {
                return ascending ? -1 : 1;
            } else if (fItem1 > fItem2) {
                return ascending ? 1 : -1;
            } else {
                return 0;
            }
        });
    }

}