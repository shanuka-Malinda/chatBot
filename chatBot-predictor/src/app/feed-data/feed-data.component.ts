import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataHandleService } from '../service/data-handle.service';

@Component({
  selector: 'app-feed-data',
  templateUrl: './feed-data.component.html',
  styleUrls: ['./feed-data.component.scss']
})
export class FeedDataComponent implements OnInit{
  dataSet: any;
  dataTable: any = this.ps.jsonData;
  myForm!: FormGroup;
  constructor(private fb: FormBuilder, private ps: DataHandleService) { }
  ngOnInit(): void {
    //this.feedData();
    console.log(this.dataSet)
    this.myForm = this.fb.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.feedData()
      this.myForm.reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data is added",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        title: "Empty Field..?",
        text: "Enter some number for X or Y",
        icon: "question"
      });
    }


  }
  feedData() {
    this.ps.jsonData.push(this.myForm.value);
  }
}
