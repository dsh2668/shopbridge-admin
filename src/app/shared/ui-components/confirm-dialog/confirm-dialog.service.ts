import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

export class CustomDialogMessage {
    key: string = null;
    value: any = null;
}

export class CustomDialogFieldLabels {
    message = 'Are you sure?';
    yesBtn = 'Yes';
    noBtn = 'No';
    type = 'confirm';
    closeable = true;
}

@Injectable({
    providedIn: 'root'
}) 
export class ConfirmDialogService {
    private subject = new Subject<any>();

    confirmThis(fieldLabels: any, actionFn: (action: boolean) => void, customMessageArray: Array<CustomDialogMessage> = []): any {
        const fieldLabelValues = new CustomDialogFieldLabels();
        Object.keys(fieldLabelValues).forEach(eachKey => {
            if (![null, undefined, ''].includes(fieldLabels[eachKey])) {
                fieldLabelValues[eachKey] = fieldLabels[eachKey];
            }
        });
        this.setConfirmation(fieldLabelValues, actionFn, customMessageArray);
    }

    setConfirmation(fieldLabels: CustomDialogFieldLabels, actionFn: (action: boolean) => void,
        customMessageArray: Array<CustomDialogMessage>): any {
        const that = this;
        this.subject.next({
            fieldLabels: fieldLabels,
            customMessage: customMessageArray,
            yesFn(): any {
                that.subject.next(null);
                actionFn(true);
            },
            noFn(): any {
                that.subject.next(null);
                actionFn(false);
            },
            close(): any {
                that.subject.next(null);
            }
        });

    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
