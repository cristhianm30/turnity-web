export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "on_leave" | "inactive";
  avatar?: string;
  startDate: string;
}
