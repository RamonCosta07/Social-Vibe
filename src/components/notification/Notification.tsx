// Styles
import * as S from "./NotificationStyles";
// Interfaces
import { UserData } from "../../interfaces/ICustomHooks/IuseUser";
import { INotificationProps } from "../../interfaces/IComponents/INotification";
// Hooks
import useGenerateRandomId from "../../customHooks/useGenerateRandomId";

const Notification = ({
  handleNotificationClick,
  contactRequests,
  showNotificationList,
  contactPendentsData,
  handleRemoveContact,
  handleConfirmContact,
}: INotificationProps) => {
  return (
    <S.NotificationWrapper>
      <S.NotificationIcon
        onClick={handleNotificationClick}
        title="Solicitações de amizade"
      />
      {contactRequests > 0 && (
        <S.NotificationCount>{contactRequests}</S.NotificationCount>
      )}
      {showNotificationList && (
        <>
          {contactPendentsData.length > 0 ? (
            <S.NotificationList>
              <h4>Solicitações</h4>
              {contactPendentsData.map((contact: UserData) => (
                <S.NotificationItem key={useGenerateRandomId() + contact.email}>
                  {contact.avatar ? (
                    <S.ContactPhoto
                      src={contact.avatar}
                      alt={contact.displayName}
                    />
                  ) : (
                    <S.ProfileImage />
                  )}

                  <S.ContactName>{contact.displayName}</S.ContactName>
                  <S.ConfirmButton
                    title="Aceita solicitação"
                    onClick={() => handleConfirmContact(contact.email)}
                  >
                    <S.ConfirmIcon />
                  </S.ConfirmButton>
                  <S.DeclineButton
                    title="Recusar solicitação"
                    onClick={() => handleRemoveContact(contact.email)}
                  >
                    <S.DeclineIcon />
                  </S.DeclineButton>
                </S.NotificationItem>
              ))}
            </S.NotificationList>
          ) : (
            <S.NotificationList>
              <h4>Solicitações</h4>
              <S.NoRequestWarning>
                <p>Nenhuma solicitação</p>
              </S.NoRequestWarning>
            </S.NotificationList>
          )}
        </>
      )}
    </S.NotificationWrapper>
  );
};

export default Notification;
