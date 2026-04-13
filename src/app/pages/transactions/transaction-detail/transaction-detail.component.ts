import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction-service';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  standalone: false,
})
export class TransactionDetailComponent  implements OnInit {
  transaction: Transaction | undefined;
  loadingData: boolean = true;
  proofImageUrl = '../../../../assets/photo-camera-off-svgrepo-com.png';

  constructor(private route: ActivatedRoute, private router: Router, private transactionService: TransactionService){}
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id){
      this.close()
      return;
    }

    const tFound = await this.transactionService.get(id);
    if(!tFound){
      this.close()
      return;
    }
    this.transaction = tFound;
    this.loadingData = false;
    if(this.transaction.proofImage){
      this.proofImageUrl = await this.getImageUrl(this.transaction.proofImage);
    }
    console.log(this.transaction);
  }

  async getImageUrl(fileName: string){
    const fileUri = await Filesystem.getUri({
      directory: Directory.Data,
      path: fileName
    })
    return Capacitor.convertFileSrc(fileUri.uri);
  }
  close(){
    this.router.navigate(['../'], {relativeTo : this.route})
  }

  async onDelete(){
    await this.transactionService.delete(this.transaction!.id);
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onUpdate(){
    this.router.navigate(['../../edit/', this.transaction!.id], {relativeTo: this.route})
  }
}
