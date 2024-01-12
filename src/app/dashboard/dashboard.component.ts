import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/services/dashboard.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { DashboardResponseModel } from './shared/models/Season.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  count: DashboardResponseModel;
  cards: any;
  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'Description', 'Action'];

  constructor(
    private dashboardService: DashboardService,
    private snackbarService: SnackbarService
  ) {

  }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe(res => {
      if (res && res.success) {
        this.count = res.data;
        this.cards = [
          { title: 'Users', icon: 'person', count: this.count.usersCount, route: '/users/list', iconColor: '#2196f3' },
          { title: 'Organizations', icon: 'business', count: this.count.organizationsCount, route: '/organizations/list', iconColor: '#4caf50' },
          { title: 'Tournaments', icon: 'emoji_events', count: this.count.tournamentsCount, route: '/tournaments/list', iconColor: '#ff9800' },
          { title: 'Players', icon: 'people_alt', count: this.count.playersCount, route: '/players/list', iconColor: '#e91e63' }
        ];
      } else {
        this.snackbarService.error(res.message);
      }
    });
  }
}
