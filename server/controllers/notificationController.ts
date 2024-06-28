import { Request, Response } from 'express';
import NotificationService from '../services/notificationService';

const NotificationController = {
    async getNotificationsForUser(req: Request, res: Response): Promise<void> {
      try {
        const userId = req.params.userId;
        const notifications = await NotificationService.getNotificationsForUser(userId);
        res.json({ notifications });
      } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    async markNotificationAsRead(req: Request, res: Response): Promise<void> {
        try {
          const { notificationId } = req.params;
          await NotificationService.markNotificationAsRead(notificationId);
          res.status(200).json({ message: 'Notification marked as read successfully' });
        } catch (error) {
          console.error('Error marking notification as read:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
  };
  
  export default NotificationController;