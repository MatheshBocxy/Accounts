import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { BudgetListComponent } from '../../all-components/budget-list/budget-list.component';
import { BudgetListViewComponent } from '../../all-components/budget-list-view/budget-list-view.component';
import { ScheduleListComponent } from '../../all-components/schedule-list/schedule-list.component';
import { ScheduleListViewComponent } from '../../all-components/schedule-list-view/schedule-list-view.component';
import { CodeListComponent } from '../../all-components/code-list/code-list.component';
import { CodeListViewComponent } from '../../all-components/code-list-view/code-list-view.component';
import { athuGuardGuard } from '../../athuGurad/athu-guard.guard';
import { BudgetComponent } from '../../all-components/budget/budget.component';
import { NewBudgetComponent } from '../../all-components/new-budget/new-budget.component';
import { NewBudgetListAndViewComponent } from '../../all-components/new-budget-list-and-view/new-budget-list-and-view.component';
import { CashWorksComponent } from '../../all-components/cash-works/cash-works.component';
import { CreateCashWorksComponent } from '../../all-components/create-cash-works/create-cash-works.component';
import { PaymentComponent } from '../../all-components/payment/payment.component';
import { CreatePaymentComponent } from '../../all-components/create-payment/create-payment.component';
import { PaymentListViewComponent } from '../../all-components/payment-list-view/payment-list-view.component';
import { JournalComponent } from '../../all-components/journal/journal.component';
import { CreateJournalComponent } from '../../all-components/create-journal/create-journal.component';
import { JvListViewComponent } from '../../all-components/jv-list-view/jv-list-view.component';
import { ReceiptComponent } from '../../all-components/receipt/receipt.component';
import { CreateReceiptComponent } from '../../all-components/create-receipt/create-receipt.component';
import { ReconciliationComponent } from '../../all-components/reconciliation/reconciliation.component';
import { CreateCasComponent } from '../../all-components/create-cas/create-cas.component';
import { CreateGstComponent } from '../../all-components/create-gst/create-gst.component';
import { GstPageTwoComponent } from '../../all-components/gst-page-two/gst-page-two.component';
import { CreateGeneralLedgerComponent } from '../../all-components/create-general-ledger/create-general-ledger.component';
import { CreateBalanceComponent } from '../../all-components/create-balance/create-balance.component';
import { CreateIeAccountComponent } from '../../all-components/create-ie-account/create-ie-account.component';
import { RpAccountComponent } from '../../all-components/rp-account/rp-account.component';
import { TrialBalanceComponent } from '../../all-components/trial-balance/trial-balance.component';
import { SubcodeComponent } from '../../all-components/subcode/subcode.component';
import { SubcodeListViewComponent } from '../../all-components/subcode-list-view/subcode-list-view.component';
import { ASBeRbeBudgetComponent } from '../../all-components/as-be-rbe-budget/as-be-rbe-budget.component'
import { ASBudgetTabeComponent } from '../../all-components/as-budget-tabe/as-budget-tabe.component';
import { ASBudgetviewEditComponent } from '../../all-components/as-budgetview-edit/as-budgetview-edit.component';
import { ConsolidationAsComponent } from '../../all-components/consolidation-as/consolidation-as.component';
import { ConsolidationAsTableComponent } from '../../all-components/consolidation-as-table/consolidation-as-table.component';

const routes: Routes = [

  {
    path: 'home', component: SideNavComponent, canActivate: [athuGuardGuard],
    children: [
      { path: '', redirectTo: 'budget-list', pathMatch: 'full' },
      { path: 'budget-list', component: BudgetListComponent, canActivate: [athuGuardGuard] },
      { path: 'budget-list-view/:mode/:id', component: BudgetListViewComponent, canActivate: [athuGuardGuard] },
      { path: 'schedule-list', component: ScheduleListComponent, canActivate: [athuGuardGuard] },
      { path: 'schedule-list-view/:mode/:id', component: ScheduleListViewComponent, canActivate: [athuGuardGuard] },
      { path: 'code-list', component: CodeListComponent, canActivate: [athuGuardGuard] },
      { path: 'code-list-view/:mode/:id', component: CodeListViewComponent, canActivate: [athuGuardGuard] },
      { path: 'budget', component: BudgetComponent, canActivate: [athuGuardGuard] },
      { path: 'new-budget', component: NewBudgetComponent, canActivate: [athuGuardGuard] },
      { path: 'new-budget/:value', component: NewBudgetComponent, canActivate: [athuGuardGuard] },
      { path: 'NewBudget-list-view/:divisionName/:beRbe/:mode/:id/:countOfDatas', component: NewBudgetListAndViewComponent, canActivate: [athuGuardGuard] },
      { path: 'NewBudget-list-view/:divisionName/:beRbe/:mode/:id', component: NewBudgetListAndViewComponent, canActivate: [athuGuardGuard] },
      { path: 'cash-works', component: CashWorksComponent, canActivate: [athuGuardGuard] },
      { path: 'create-cash-works', component: CreateCashWorksComponent, canActivate: [athuGuardGuard] },
      { path: 'create-cash-works/:type/:year/:value', component: CreateCashWorksComponent, canActivate: [athuGuardGuard] },

      { path: 'subcode', component: SubcodeComponent, canActivate: [athuGuardGuard] },
      { path: 'subcode-list-view/:mode/:id', component: SubcodeListViewComponent, canActivate: [athuGuardGuard] },

      { path: 'payment', component: PaymentComponent, canActivate: [athuGuardGuard] },
      { path: 'create-payment', component: CreatePaymentComponent, canActivate: [athuGuardGuard] },
      { path: 'payment-list-view/:mode/:id', component: PaymentListViewComponent, canActivate: [athuGuardGuard] },
      { path: 'create-payment', component: CreatePaymentComponent, canActivate: [athuGuardGuard] },
      { path: 'journal', component: JournalComponent, canActivate: [athuGuardGuard] },
      { path: 'create-journal', component: CreateJournalComponent, canActivate: [athuGuardGuard] },
      { path: 'jv-listView/:mode/:id', component: JvListViewComponent, canActivate: [athuGuardGuard] },
      { path: 'receipt', component: ReceiptComponent, canActivate: [athuGuardGuard] },
      { path: 'create-receipt/:receiptNo', component: CreateReceiptComponent, canActivate: [athuGuardGuard] },
      { path: 'reconciliation', component: ReconciliationComponent, canActivate: [athuGuardGuard] },

      { path: 'create-cas', component: CreateCasComponent, canActivate: [athuGuardGuard] },
      { path: 'create-gst', component: CreateGstComponent, canActivate: [athuGuardGuard] },
      { path: 'gstTwo', component: GstPageTwoComponent, canActivate: [athuGuardGuard] },
      { path: 'create-general-ledger', component: CreateGeneralLedgerComponent, canActivate: [athuGuardGuard] },
      { path: 'create-balance', component: CreateBalanceComponent, canActivate: [athuGuardGuard] },
      { path: 'create-ie-account', component: CreateIeAccountComponent, canActivate: [athuGuardGuard] },
      { path: 'rp-account', component: RpAccountComponent, canActivate: [athuGuardGuard] },
      { path: 'trial-balance', component: TrialBalanceComponent, canActivate: [athuGuardGuard] },
      { path: 'as-budget/:AS-beRbe', component: ASBeRbeBudgetComponent, canActivate: [athuGuardGuard] },
      { path: 'as-table', component: ASBudgetTabeComponent, canActivate: [athuGuardGuard] },
      { path: 'as-viewEdit/:division/:role/:action/:asBeRbe/:year/:dataCount', component: ASBudgetviewEditComponent, canActivate: [athuGuardGuard] },
      { path: 'consolidationAs', component: ConsolidationAsComponent, canActivate: [athuGuardGuard] },
      { path: 'consolidationAsTable/:budgetType/:beRbe/:year', component: ConsolidationAsTableComponent, canActivate: [athuGuardGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceLoadingRoutingModule { }
