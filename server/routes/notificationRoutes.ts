import express from 'express';
import NotificationController from '../controllers/notificationController';

const router = express.Router();

// Endpoint to fetch notifications for a specific user
router.get('/:userId', NotificationController.getNotificationsForUser);

// Endpoint to mark a notification as read
router.patch('/:notificationId', NotificationController.markNotificationAsRead);

export default router;
