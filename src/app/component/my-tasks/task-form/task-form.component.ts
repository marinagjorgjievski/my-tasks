import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { Location } from '@angular/common';
import { TaskModel } from '../../../model/task';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit {
  @Input() task: TaskModel;

  isLoading: boolean;
  editMode: boolean = false;

  taskForm = this.fb.group({
    description: ['', Validators.required],
    from: ['', Validators.required],
    to: ['', Validators.required],
    status: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) { 
    this.isLoading = false;
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.editMode = true;
    }
    if (this.editMode) {
      this.getTask(id);
    }
  }

  get description() { return this.taskForm.controls['description']; };
  get from() { return this.taskForm.controls['from']; };
  get to() { return this.taskForm.controls['to']; };
  get status() { return this.taskForm.controls['status']; };

  getTask(id:number): void {
    this.taskService.getTask(id)
      .subscribe(task => {
        this.task = task;
        this.taskForm.setValue({
          description: task.description,
          from: task.from,
          to: task.to,
          status: task.status,
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.editMode) {
      const updateTask = Object.assign({}, this.task, this.taskForm.value);
      this.taskService.updateTask(updateTask).subscribe(() => {
        this.isLoading = false;
        this.goBack();
      });

    } else {
      const newTask = this.taskForm.value;
      this.taskService.addTask(newTask).subscribe(() => {
        this.isLoading = false;
        this.goBack();
      });
    }
  }
}
