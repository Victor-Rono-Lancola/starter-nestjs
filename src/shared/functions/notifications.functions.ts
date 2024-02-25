/* eslint-disable prettier/prettier */
type NotificationTypes = 'success' | 'warning' | 'info' | 'error';

/**
 * Creates a notification object with the given notification type and message.
 *
 * @param notificationType - The type of notification (success, warning, info, error)
 * @param message - The message to display in the notification
 * @returns The notification object
 */
export function createNotification(
    notificationType: NotificationTypes,
    message: string,
) {
    return {
        notificationType,
        message,
    }
};
