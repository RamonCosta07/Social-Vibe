// Styles
import * as S from "./SearchResultsStyles";
// Icons
import { IoAdd } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { BsFillPersonFill, BsFillSendFill } from "react-icons/bs";
import { GiLookAt } from "react-icons/gi";
// Hooks
import { useEffect, useState } from "react";
// Components
import Loading from "../loading/Loading";
// Interfaces
import { ISearchResultsProps } from "../../interfaces/IComponents/ISearchResults";

const SearchResults = ({
  searchResults,
  isOwnProfile,
  handleAddContact,
  isFriend,
  isRequestSent,
  isContactPending,
}: ISearchResultsProps) => {
  const [friendStatus, setFriendStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [requestSentMap, setRequestSentMap] = useState<Record<string, boolean>>(
    {}
  );
  const [pendingMap, setPendingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkFriendStatus = async () => {
      setLoading(true);
      const statusMap: Record<string, boolean> = {};
      const requestSentMap: Record<string, boolean> = {};
      const pendingMap: Record<string, boolean> = {};

      for (const user of searchResults) {
        const isFriendResult = await isFriend(user);
        statusMap[user.email] = isFriendResult;

        const requestSent = await isRequestSent(user);
        requestSentMap[user.email] = requestSent;

        const isPending = await isContactPending(user.email);
        pendingMap[user.email] = isPending;
      }

      setFriendStatus(statusMap);
      setRequestSentMap(requestSentMap);
      setPendingMap(pendingMap);
      setLoading(false);
    };

    checkFriendStatus();
  }, [searchResults, isFriend, isRequestSent, isContactPending]);

  return (
    <S.SearchResults loading={loading ? "true" : "false"}>
      {loading ? (
        <S.LoadingContainer>
          <Loading />
        </S.LoadingContainer>
      ) : (
        <ul>
          {searchResults.map((user, index) => {
            return (
              <S.UsersSearch key={user.email+user.displayName+index}>
                <li>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.displayName} />
                  ) : (
                    <span className="ProfileIcon">
                      <BsFillPersonFill />
                    </span>
                  )}
                  <S.UserName className="UserName" title={user.displayName}>
                    {user.displayName}
                  </S.UserName>

                  {!isOwnProfile(user) && (
                    <>
                      {friendStatus[user.email] ? (
                        <S.Friends>
                          <FaUserFriends />
                          <span>Amigo</span>
                        </S.Friends>
                      ) : requestSentMap[user.email] ? (
                        <S.RequestSend>
                          <BsFillSendFill />
                          <span>Enviado</span>
                        </S.RequestSend>
                      ) : pendingMap[user.email] ? (
                        <S.ContactPendent>
                          <span>Confirme solicitação</span>
                          <GiLookAt />
                        </S.ContactPendent>
                      ) : (
                        <>
                          <div style={{ flex: 1 }}></div>
                          <S.AddButton
                            onClick={() => handleAddContact(user)}
                            title="Adicionar a lista de amigos"
                          >
                            <IoAdd /> Adicionar
                          </S.AddButton>
                        </>
                      )}
                    </>
                  )}
                </li>
              </S.UsersSearch>
            );
          })}
        </ul>
      )}
    </S.SearchResults>
  );
};

export default SearchResults;
