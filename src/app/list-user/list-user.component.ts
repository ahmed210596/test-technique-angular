import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

interface User {
  id: number;
  age: number;
  dob: string;
  email: string;
  salary: string;
  address: string;
  imageUrl: string;
  lastName: string;
  firstName: string;
  contactNumber: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  usersPerPage: User[] = [];
  itemsPerPageOptions = [5, 10, 20];
  itemsPerPage = 5;
  currentPage = 1;
  totalPages: number[] = [];
  filterTerm: string = '';
  sortBy: string = '';
  sortReverse: boolean = false;
  showModal: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsersPerPage();
  }

  loadUsersPerPage(): void {
    // Simulating fetching users from service
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.calculateTotalPages();
        this.updateUsersPerPage();
      },
      (error) => {
        console.error('Error loading users:', error);
        // Handle error as needed
      }
    );
  }

  updateUsersPerPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.usersPerPage = this.users.slice(startIndex, startIndex + this.itemsPerPage);
  }

  handleSort(attribute: keyof User): void {
    if (!attribute) return;

    if (this.sortBy === attribute) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortBy = attribute;
      this.sortReverse = false;
    }

    this.users.sort((a, b) => {
      const valueA = a[attribute];
      const valueB = b[attribute];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      } else {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
    });

    if (this.sortReverse) {
      this.users.reverse();
    }

    this.updateUsersPerPage();
    this.calculateTotalPages();
  }

  gotoPage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.updateUsersPerPage();
    }
  }

  changeItemsPerPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
    this.calculateTotalPages();
    this.updateUsersPerPage();
  }

  calculateTotalPages(): void {
    this.totalPages = [];
    const pageCount = Math.ceil(this.users.length / this.itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
      this.totalPages.push(i);
    }
  }

  applyFilter(): void {
    this.usersPerPage = this.users.filter(user =>
      Object.values(user).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(this.filterTerm.toLowerCase())
      )
    );
  }

  clearFilter(): void {
    this.filterTerm = '';
    this.updateUsersPerPage();
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onAddUser(newUser: any): void {
    // Assuming id generation logic or server-side handling
    const id = this.users.length + 1;
    const user: User = {
      id: id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      age: newUser.age,
      salary: newUser.salary,
      address: newUser.address,
      dob: '', // Assuming dob is not collected in the form
      imageUrl: '', // Assuming imageUrl is not collected in the form
      contactNumber: '' // Assuming contactNumber is not collected in the form
    };

    this.users.push(user);
    this.updateUsersPerPage();
    this.calculateTotalPages();
    this.closeModal();
  }


  deleteUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.updateUsersPerPage();
      this.calculateTotalPages();
    }
  }
}
