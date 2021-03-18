export class TaskModel {
  id: number;
  description: string;
  from: Date;
  to: Date;
  status: string;
  created: Date;
  modified: Date;
  userId: number;

  constructor(
    id: number, 
    description: string, 
    from: Date, 
    to: Date,
    status: string,
    created: Date,
    modified: Date,
    userId: number
    ) {
      this.id = id;
      this.description = description;
      this.from = from;
      this.to = to;
      this.status = status;
      this.created = created;
      this.modified = modified;
      this.userId = userId;
  }
}

