import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/core/models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction-service';
import { Capacitor } from '@capacitor/core';

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
    console.log(this.transaction);
  }

  getImageUrl(fileName: string){
    const path = `data/${fileName}`
    return Capacitor.convertFileSrc(path);
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
