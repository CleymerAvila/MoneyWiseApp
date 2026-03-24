import { CameraService } from './../../../core/services/camera-service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction-service';
import { ICON_CATEGORIES } from 'src/app/shared/constants/icon-categories';
import { IconCategory } from 'src/app/shared/models/icon-category.model';
import { v4  as uuid } from 'uuid';
import { Capacitor  } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.scss'],
  standalone: false,
})
export class TransactionsFormComponent  implements OnInit {
  transaction?: Transaction;
  transactionId?: string;
  categoriesOptions: IconCategory[]  = ICON_CATEGORIES;
  transactionForm!: FormGroup;
  type!: FormControl;
  category!: FormControl;
  issueDate!: FormControl;
  amount!: FormControl;
  description!: FormControl;
  proofImage!: FormControl;
  currentDateString = new Date().toISOString();
  isEditMode: boolean = false;
  isModalSelectImageOpen = false;
  ASSETS_BASE_URL = '../../../../assets/'
  proofImageUrl = `${this.ASSETS_BASE_URL}photo-camera-off-svgrepo-com.png`;
  photoToSave: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private  cameraService:CameraService
  ) {
  }

  async ngOnInit() {
    this.initForm();
    this.loadTransaction();
  }

  setOpen(isOpen: boolean){
    this.isModalSelectImageOpen = isOpen;
  }

  async loadTransaction() {
    const id = this.route.snapshot.paramMap.get('id');

    if(!id) return;
    const transaction =  await this.transactionService.get(id);
    if(!transaction) return;
    this.isEditMode = true;
    this.transactionId = id;
    this.transaction = transaction;
    if(transaction.proofImage){
      this.proofImageUrl = await this.getImageUrl(transaction.proofImage);
    }
    this.transactionForm.patchValue({
      type: transaction.type,
      category: transaction.category,
      issueDate: transaction.issueDate,
      amount: transaction.amount,
      description: transaction.description,
      proofImage: transaction.proofImage
    });
  }

  private initForm(){
    this.type = new FormControl( '',
      Validators.required
    )
    this.category= new FormControl('',
      Validators.required
    )
    this.issueDate= new FormControl(this.currentDateString,
      Validators.required
    )
    this.amount= new FormControl('',
      Validators.required
    )
    this.description= new FormControl('')
    this.proofImage= new FormControl( '')

    this.transactionForm = new FormGroup({
      type: this.type,
      category: this.category,
      issueDate: this.issueDate,
      amount: this.amount,
      description: this.description,
      proofImage: this.proofImage
    })
  }


  async onSubmit(){
    if(this.transactionForm.valid){
      if(this.isEditMode){

        const transaction = {
          id: this.transactionId!,
          ...this.transactionForm.value
        }

        if(this.photoToSave){
          const fileName = await this.saveSelectedPhoto();
          this.proofImage.setValue(fileName);
          transaction.proofImage = fileName;

          this.proofImageUrl = await this.getImageUrl(fileName);
          this.photoToSave = null;
        }

        await this.transactionService.update(transaction);
        this.transactionForm.reset();
        this.transaction = undefined;
        this.close();
      } else {
        this.isEditMode = false;
        this.transaction = undefined;
        const transaction = this.createNewTrans(this.transactionForm.value);
        if(this.photoToSave){
          const fileName = await this.saveSelectedPhoto();
          this.proofImage.setValue(fileName);
          transaction!.proofImage = fileName;

          this.proofImageUrl = await this.getImageUrl(fileName);
        }
        this.transactionForm.reset();
        await this.transactionService.create(transaction!);
        this.close();
      }
    } else {
      this.getFormValidationErrors()
    }

  }

  private createNewTrans(formValue: any) : Transaction | null{
    const newTrans : Transaction = {
      id: uuid(),
      type: formValue.type,
      category: formValue.category,
      issueDate: new Date(formValue.issueDate).toISOString(),
      amount: formValue.amount,
      description: formValue.description,
      proofImage: formValue.proofImage
    }
    return newTrans
  }

  // Obtener todos los errores del formulario (recursivo)
  getFormValidationErrors() {
    Object.keys(this.transactionForm.controls).forEach(key => {
      const controlErrors = this.transactionForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Control: ' + key + ', Errores: ', controlErrors);
      }
    });
  }

  async openCamera(){
    const photo = await this.cameraService.takePhoto();
    this.photoToSave = photo;
    this.proofImageUrl  = photo.webPath!;
  }

  async selectFromCamera(){
    const image = await this.cameraService.selectImage();
    this.photoToSave = image;
    this.proofImageUrl  = image.webPath!;
  }

  async saveSelectedPhoto(){
    const fileName = await this.cameraService.savePhoto(this.photoToSave);
    return fileName;
  }

  async getImageUrl(fileName: string){
    const fileUri = await Filesystem.getUri({
      directory: Directory.Data,
      path: fileName
    })
    return Capacitor.convertFileSrc(fileUri.uri);
  }

  closePhotoSelectorModal(){
    this.setOpen(false)
  }

  handleCategoryChange(event: any){
    this.transactionForm.patchValue({
      category: event
    })
  }

  handleDateChange(event: any){
    this.transactionForm.patchValue({
      issueDate: event
    })
  }

  close(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
