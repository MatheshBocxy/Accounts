import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FinanceLoadingRoutingModule } from './finance-loading-routing.module';
import { BudgetListComponent } from '../../all-components/budget-list/budget-list.component';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MaterialAngularModule } from '../../material-angular/material-angular.module';
import { DeletePopupComponent } from '../../all-components/delete-popup/delete-popup.component';
import { ScheduleListComponent } from '../../all-components/schedule-list/schedule-list.component';
import { BudgetListViewComponent } from '../../all-components/budget-list-view/budget-list-view.component';
import { ScheduleListViewComponent } from '../../all-components/schedule-list-view/schedule-list-view.component';
import { CodeListComponent } from '../../all-components/code-list/code-list.component';
import { CodeListViewComponent } from '../../all-components/code-list-view/code-list-view.component';
import { BudgetComponent } from '../../all-components/budget/budget.component';
import { NewBudgetComponent } from '../../all-components/new-budget/new-budget.component';
import { NewBudgetListAndViewComponent } from '../../all-components/new-budget-list-and-view/new-budget-list-and-view.component';
import { CashWorksComponent } from '../../all-components/cash-works/cash-works.component';
import { CreateCashWorksComponent } from '../../all-components/create-cash-works/create-cash-works.component';
import { PaymentComponent } from '../../all-components/payment/payment.component';
import { CreatePaymentComponent } from '../../all-components/create-payment/create-payment.component';
import { PaymentListViewComponent } from '../../all-components/payment-list-view/payment-list-view.component';
import { CreateJournalComponent } from '../../all-components/create-journal/create-journal.component';
import { JournalComponent } from '../../all-components/journal/journal.component';
import { JvListViewComponent } from '../../all-components/jv-list-view/jv-list-view.component';
import { CreateReceiptComponent } from '../../all-components/create-receipt/create-receipt.component';
import { ReceiptComponent } from '../../all-components/receipt/receipt.component';
import { ReconciliationComponent } from '../../all-components/reconciliation/reconciliation.component';
import { CreateBalanceComponent } from '../../all-components/create-balance/create-balance.component';
import { CreateCasComponent } from '../../all-components/create-cas/create-cas.component';
import { CreateGeneralLedgerComponent } from '../../all-components/create-general-ledger/create-general-ledger.component';
import { CreateGstComponent } from '../../all-components/create-gst/create-gst.component';
import { CreateIeAccountComponent } from '../../all-components/create-ie-account/create-ie-account.component';
import { GstPageTwoComponent } from '../../all-components/gst-page-two/gst-page-two.component';
import { RpAccountComponent } from '../../all-components/rp-account/rp-account.component';
import { TrialBalanceComponent } from '../../all-components/trial-balance/trial-balance.component';
import { SubcodeComponent } from '../../all-components/subcode/subcode.component';
import { SubcodeListViewComponent } from '../../all-components/subcode-list-view/subcode-list-view.component';
import { SubCodePopupformComponent } from '../../all-components/sub-code-popupform/sub-code-popupform.component';
import { ASBeRbeBudgetComponent } from '../../all-components/as-be-rbe-budget/as-be-rbe-budget.component'
import { ASBudgetTabeComponent } from '../../all-components/as-budget-tabe/as-budget-tabe.component';
import { ASBudgetviewEditComponent } from '../../all-components/as-budgetview-edit/as-budgetview-edit.component';
import { PopUpAsBeRbeFormComponent } from '../../all-components/pop-up-as-be-rbe-form/pop-up-as-be-rbe-form.component';
import { ConsolidationAsComponent } from '../../all-components/consolidation-as/consolidation-as.component';
import { ConsolidationAsTableComponent } from '../../all-components/consolidation-as-table/consolidation-as-table.component';
import { BugdetSplitUpForConsolidationComponent } from '../../all-components/bugdet-split-up-for-consolidation/bugdet-split-up-for-consolidation.component';
import { OpenSubGroupInConsolidationComponent } from '../../all-components/open-sub-group-in-consolidation/open-sub-group-in-consolidation.component';
import { ProposedFixedSplitupComponent } from '../../all-components/proposed-fixed-splitup/proposed-fixed-splitup.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#00ACC1',
  fgsColor: '#00ACC1',
  pbColor: '#00ACC1',
  bgsPosition: 'bottom-right',
  bgsSize: 40,
  bgsType: 'ball-spin-clockwise', // background spinner type
  fgsType: 'rectangle-bounce', // foreground spinner type
  pbDirection: 'ltr', // progress bar direction
  pbThickness: 5 // progress bar thickness
};


@NgModule({
  declarations: [
    BudgetListComponent,
    SideNavComponent,
    DeletePopupComponent,
    BudgetListViewComponent,
    ScheduleListComponent,
    ScheduleListViewComponent,
    CodeListComponent,
    CodeListViewComponent,
    BudgetComponent,
    NewBudgetComponent,
    NewBudgetListAndViewComponent,
    CashWorksComponent,
    CreateCashWorksComponent,
    PaymentComponent,
    CreatePaymentComponent,
    PaymentListViewComponent,
    JournalComponent,
    CreateJournalComponent,
    JvListViewComponent,
    ReceiptComponent,
    CreateReceiptComponent,
    ReconciliationComponent,
    CreateCasComponent,
    CreateGstComponent,
    GstPageTwoComponent,
    CreateGeneralLedgerComponent,
    CreateBalanceComponent,
    CreateIeAccountComponent,
    RpAccountComponent,
    TrialBalanceComponent,
    SubcodeComponent,
    SubcodeListViewComponent,
    SubCodePopupformComponent,
    ASBeRbeBudgetComponent,
    ASBudgetTabeComponent,
    ASBudgetviewEditComponent,
    PopUpAsBeRbeFormComponent,
    ConsolidationAsComponent,
    ConsolidationAsTableComponent,
    BugdetSplitUpForConsolidationComponent,
    OpenSubGroupInConsolidationComponent,
    ProposedFixedSplitupComponent

  ],
  imports: [
    CommonModule,
    FinanceLoadingRoutingModule,

    MaterialAngularModule,

    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    NgxUiLoaderHttpModule.forRoot(ngxUiLoaderConfig),
    MatIconModule,
    MatDatepickerModule,
    HttpClientModule,
    DatePipe
  ]
})
export class FinanceLoadingModule { }
