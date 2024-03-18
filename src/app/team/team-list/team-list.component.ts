import { Component, OnInit } from '@angular/core';
import { TeamsList } from '../shared/models/team.model';
import { TeamsService } from '../shared/services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamAddComponent } from '../team-add/team-add.component';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: any[];
  filteredTeams: any[] = []; // Array to hold filtered sports
  searchText: string = ''; // Search text input field model
  displayedColumns: string[] = ['Logo', 'Name', 'Tournament', 'Action'];

  constructor(
    private dialog: MatDialog,
    private teamsService: TeamsService,
    ){
      
    }

  ngOnInit() {
    this.getAllTeams();
  }


  getAllTeams() {
    this.teamsService.getAllTeams().subscribe(res => {
      if(res && res.success) {
        this.teams = res.data;
        this.filteredTeams = this.teams.slice();
      }
    });
  }

  // Function to filter sports based on search text
  filterTeam() {
    this.filteredTeams = this.teams.filter(team =>
      team.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      team.tournament.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addTeam() {
    // Open Add Component in a dialog without passing any data
    const dialogRef = this.dialog.open(TeamAddComponent, {
      data: { mode: 'add' },
      width: '1000px', // Set the width as per your requirement
      height: '800px', // Set the height as per your requirement
      panelClass: 'custom-dialog-container', // Custom CSS class for styling
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTeams();
      // Handle any action after dialog closes
    });
  }

  editTeam(data) {
    this.teamsService.getTeamById(data.id).subscribe(res => {
      const dialogRef = this.dialog.open(TeamAddComponent, {
        data: { mode: 'edit', item: res.data },
        width: '1000px', // Set the width as per your requirement
        height: '800px', // Set the height as per your requirement
        panelClass: 'custom-dialog-container', // Custom CSS class for styling
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.getAllTeams();
        // Handle any action after dialog closes
      });
    });
  }
 
  deleteTeam(data) {
    this.teamsService.deleteTeam(data.id).subscribe(res => {      
        this.getAllTeams();      
    });
  }  

  openDialog(data) {    
    const dialogRef = this.dialog.open(ConfirmationDialog,{
    data:{
        message: 'Do you want to delete this team?'
    }
    });
     
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteTeam(data);   
        }
    });
}
}
