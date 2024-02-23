import { Component, OnInit } from '@angular/core';
import { TeamsList } from '../shared/models/team.model';
import { TeamsService } from '../shared/services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamAddComponent } from '../team-add/team-add.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: TeamsList[];
  displayedColumns: string[] = ['Logo', 'Name', 'Tournament', 'IsActive', 'Action'];

  constructor(
    private dialog: MatDialog,
    private teamsService: TeamsService
    ){
      
    }

  ngOnInit() {
    this.getAllTeams();
  }


  getAllTeams() {
    this.teamsService.getAllTeams().subscribe(res => {
      if(res && res.success) {
        this.teams = res.data;
      }
    });
  }

  addTeam() {
    // Open Add Component in a dialog without passing any data
    const dialogRef = this.dialog.open(TeamAddComponent, {
      data: { mode: 'add' },
      width: '900px', // Set the width as per your requirement
      height: '700px', // Set the height as per your requirement
      panelClass: 'custom-dialog-container', // Custom CSS class for styling
      autoFocus: false,
    });
  }
}
