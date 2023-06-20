export interface INotificationProps {
  handleNotificationClick: () => void;
  contactRequests: number;
  showNotificationList: boolean;
  contactPendentsData: any;
  handleRemoveContact: (contactId: string) => Promise<void>;
  handleConfirmContact: (contactEmail: string) => Promise<void>;
}
