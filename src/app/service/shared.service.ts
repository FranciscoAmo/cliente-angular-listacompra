import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { List } from '../model/lista.model';

@Injectable()
export class SharedService {
    private subject = new Subject<List>();

    sendList(list: List) {
        console.log(list);
        this.subject.next( list );

    }

    clearMessage() {
        this.subject.next();
    }

    getList(): Observable<List> {
        return this.subject.asObservable();
    }
}
