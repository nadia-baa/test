import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    styleUrls  : ['./user.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit
{

    
    user: any;

    /**
     * Constructor
     */
    constructor(private route: Router,
                private http: HttpClient,
                private _route: ActivatedRoute,
        )
    {
    }
    ngOnInit(): void {
        console.log("hello")
        let id = this._route.snapshot.params.id;
       this.http.get<any[]>('http://localhost:3005/users/user/'+id).subscribe(
        value => {
            this.user=value;
        }
       );
    }


    

    toDo(i: any){
        this.route.navigate(['/pages/gerer/users/edit',i]);
    }

    

    delete(user: any){
        console.log(user)
        this.http.request('delete', 'http://localhost:3005/users/user/delete/'+user.userId).subscribe(
            value => {
                this.user = this.http.get<any[]>('http://localhost:3005/users');
            }
        ) 
    }
}
