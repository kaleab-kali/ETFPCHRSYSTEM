export interface INotification {
  _id: string;
  userId?: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
export interface INotification2 {
  [x: string]: any;
  isRead: boolean;
}
