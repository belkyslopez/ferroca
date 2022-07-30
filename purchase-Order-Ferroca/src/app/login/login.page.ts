import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 // private unsubscribe$: Subject<boolean> = new Subject();
 // loginForm: FormGroup;

  constructor(
    
  ) { }

  ngOnInit() {
   // this.prepareForm();
  }
/*
  get form() {
    return this.loginForm.controls;
  }

  prepareForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', { validators: [Validators.required, rutIsValid], updateOn: 'blur' }],
      password: ['', [Validators.required,Validators.minLength(4), Validators.maxLength(32)]],
      userRemember: [ true ]
    });
  }

  

  clearLoginForm() {
    this.loginForm.reset();
    !this.userRemember ? this.loginForm.controls.username.setValue('') : this.loginForm.controls.username.setValue(this.userRemember.rut);
    this.loginForm.controls['password'].setValue('');
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

  login() {            
    if (this.loginForm.valid) {      
      const rutClean = this.username.value.replace(/^0+|[^0-9kK]+/g, '').toUpperCase();
      this.user$ = this.authenticationService.login(rutClean, this.password.value);
      this.user$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(data => {
          if (data.errorCodigo === 0) {
            this.getAfiliateInformation();
            this.menu.enable(true, 'custom');
          } else {
            this.clearLoginForm();
            this.loading = false;
            if (data['errorGlosa'] === 'Usuario o clave invalido') {
              this.alertService.presentAlertPassword(data['errorGlosa'], 'Por favor inténtalo nuevamente.');
            } 
          }
        },
          error => {
            this.loading = false;
          }
        );
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }*/
}