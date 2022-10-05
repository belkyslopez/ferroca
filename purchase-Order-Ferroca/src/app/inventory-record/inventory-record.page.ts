import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inventory-record',
  templateUrl: './inventory-record.page.html',
  styleUrls: ['./inventory-record.page.scss'],
})
export class InventoryRecordPage implements OnInit {

  stockForm: FormGroup;

  constructor(    public formBuilder: FormBuilder,
    private navCtrlr: NavController,
    ) { }

  ngOnInit() {

  }

//   getProduct(){
//     this.navCtrlr.navigateRoot('/tabs2',);
//    }
  
//   get form() { return this.stockForm.controls; }  
//   get errorControl() { return this.stockForm.controls; }
//  // get nombre() { return this.stockForm.get('nombre'); }
//   get cantidad() { return this.stockForm.get('cantidad'); }

//   prepareForm(): void {
//     console.log(" prepareForm ====>>> ");
//     this.stockForm = this.formBuilder.group({
//      // nombre: ['', { validators: [Validators.required], updateOn: 'blur' }],
//       cantidad: ['', { validators: [Validators.required], updateOn: 'blur' }],

//     });
//   }

//   clearLoginForm() {
//    console.log("clearLoginForm");
//    this.stockForm.reset();
//   // this.stockForm.controls['nombre'].setValue('');
//    this.stockForm.controls['cantidad'].setValue('');
//  }

}
