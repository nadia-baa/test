import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector       : 'users',
    templateUrl    : './users.component.html',
    styleUrls  : ['./users.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit
{
    
    users: Observable<any>;

    /**
     * Constructor
     */
    constructor(private route: Router,
                private http: HttpClient
        )
    {
    }
    ngOnInit(): void {
       this.users = this.http.get<any[]>('http://localhost:3005/users');
    }


    

    toDo(i: any){
        this.route.navigate(['/pages/gerer/users/edit',i]);
    }
    toDo1(i: any){
        this.route.navigate(['/pages/gerer/users/preview/',i]);
    }
    

    delete(user: any){
        console.log(user)
        this.http.request('delete', 'http://localhost:3005/users/user/delete/'+user.userId).subscribe(
            value => {
                this.users = this.http.get<any[]>('http://localhost:3005/users');
            }
        )
        
    }
}
