export class Session {
  id: number;
  owner_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  max_participants: number;
  difficulty: 'LOW' | 'MEDIUM' | 'HIGH';
  price: number;
  description: string;
  status: 'CANCELLED' | 'ENDED';

  constructor(id: number, owner_id: number, name: string, start_date: Date, duration: number, max_participants: number, difficulty: "LOW" | "MEDIUM" | "HIGH", price: number, description: string, status: "CANCELLED" | "ENDED") {
    this.id = id;
    this.owner_id = owner_id;
    this.name = name;
    this.start_date = start_date;
    this.max_participants = max_participants;
    this.difficulty = difficulty;
    this.price = price;
    this.description = description;
    this.status = status;
    this.end_date = new Date();
    this.end_date.setDate(start_date.getTime() + duration * 60000);
  }
}
