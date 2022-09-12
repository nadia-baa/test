import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector       : 'edit-user',
    templateUrl    : './edit-user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent
{
    color: string;
    _color: string;
    myUser: any;
    myRoles: any[];
    id: any;
    showUserForm: boolean;
    showRolesForm: boolean;

     @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    roleForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _formBuilder$: UntypedFormBuilder,
        private _router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.color= '5px solid var(--fuse-primary)';
        this._color = '5px solid #eef2ff';
        this.showUserForm= true;
        this.initForms()
       

        // Create the form
        
    }

    initForms(){
        let id = this.route.snapshot.params.id;
        this.roleForm = this._formBuilder$.group(
            {
                roleName: ['', Validators.required]
            }
        )
       // let myUser: any;
        this.http.get<any>('http://localhost:3005/users/user/'+id).subscribe(
            value => {
                console.log(value)
                this.myUser= value;
                this.myRoles= value.roles;
                this.signUpForm = this._formBuilder.group({
                    name      : [this.myUser.name, Validators.required],
                    email     : [this.myUser.email, [Validators.required, Validators.email]],
                    password  : [this.myUser.password, Validators.required],
                    company   : [this.myUser.company],
                    isAdmin   : [this.myUser.isAdmin]
                }
            );
            }
        )

    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    toDo(){
        console.log(this.signUpForm.value);
        this.http.put<any>('http://localhost:3005/users/user/update',
        {
            userId: this.route.snapshot.params.id,
            name: this.signUpForm.value.name,
            email: this.signUpForm.value.email,
            password: this.signUpForm.value.password,
            company: this.signUpForm.value.company,
            isAdmin: this.signUpForm.value.isAdmin
        }
        ).subscribe()
    }

    displayUserForm(){
          this.showUserForm= true;
          this.showRolesForm = false;
          this.color= '5px solid var(--fuse-primary)';
          this._color = '5px solid #eef2ff';
    }

    displayRolesForm(){
        this.showUserForm = false;
        this.showRolesForm = true;
        this._color= '5px solid var(--fuse-primary)';
        this.color = '5px solid #eef2ff';
    }
   
    addRole(){
        if(!this.roleForm.invalid){
            this.http.post('http://localhost:3005/roles/role/'+this.myUser.userId,
              this.roleForm.value
            ).subscribe(
                value => {
                    
                },
                error => {

                },
                () => {

                }
            );
        }
        this.myRoles.push(this.roleForm.value);
        this.roleForm = this._formBuilder$.group(
            {
                roleName: ['', Validators.required]
            }
        )
    }

    deleteRole(id: any){
           this.http.delete('http://localhost:3005/roles/role/delete/'+id).subscribe();
           this.initForms();
    }
}
