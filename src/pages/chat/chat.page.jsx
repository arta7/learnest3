import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { apiCaller, useApi } from "../../core/custom-hooks/useApi";
import { useParams } from "react-router";
import { chat_apiCalls } from "../../core/services/agent";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { baseUrl, chathubUrl } from "../../core/services/baseUrl";
import { useLoginContext } from "../../core/contexts/authentication/authenticationProvider";
import { useLoadingContext } from "../../core/contexts/loading/loading";
import ChatMessageItem from "./components/chatMessageItem.component";
import { useUserProfileContext } from "../../core/contexts/profile/profileProvider";
import { getToday } from "../../core/utils/utils";
import ChatSendMessageForm from "./components/chatSendMessageForm.component";
import moment from "moment";
import "./styles.scss";

const fakeMessage = {
  id: 0,
  userId: 0,
  message: "sdfsdf sdf54sdf sdf5s sdf sdf5sdf ,sdf sdfsd4fsd sf",
  seen: true,
  chatUser: {
    id: 0,
    name: "string",
    imageUrl: "string",
    isStudent: true,
    connectionId: "string",
  },
  dateTime: "2022-03-29T06:59:26.701Z",
};

const Chat = () => {
  const { group: groupName } = useParams();

  const ref_chatList = useRef();
  const { token } = useLoginContext();
  const { profileData } = useUserProfileContext();
  const { handleOpen, handleClose } = useLoadingContext();
  const [isLoading, set_isLoading] = useState();
  const [isSending, set_isSending] = useState(false);
  const [chatMessages, set_chatMessages] = useState([]);
  const [userChatId, set_userChatId] = useState();
  const [answeringStatus, set_answeringStatus] = useState(true);

  const [connection, setConnection] = useState(null);

  const _buildConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(chathubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  };

  const _getPerviousMessages = async () => {
    //////******   Get Previous Messages
    set_isLoading(true);
    apiCaller({
      api: chat_apiCalls.apiCall_getchatmessages,
      apiArguments: groupName,
      toastMessage: true,
      onErrorMessage: "دریافت لیست پیام ها با خطا مواجه شد.",
      onSuccess: (data) => {
        set_chatMessages(data?.data?.data);
      },
      onEnd: () => {
        set_isLoading(false);
      },
    });
  };

  const _init = async () => {
    _getPerviousMessages();
    _buildConnection();
  };

  const _connectToHub = async () => {
    // check chatUserId
    if (profileData?.chatUserId) {
      set_userChatId(profileData?.chatUserId);
    }

    //////******   Start Connection
    connection
      .start()
      .then((result) => {
        // connection.invoke("getConnectionId").then((cId) => {
        //   // set_connectionId(cId);
        // });
        connection.invoke("Save", token).then(() => {
          connection.invoke("Join", groupName).then(() => {
            connection.on("ReceiveGroupMessage", (data) => {
              // console.log("ReceiveGroupMessage");
              // console.log(data);
              set_chatMessages([...chatMessages, { ...data }]);
            });
            connection.on("Join");
            connection.on("UserNotSet", (data) => {
              set_answeringStatus(false);
            });
            connection.on("GetChatUserId", (data) => {
              console.log("GetChatUserId : ", data);
              set_userChatId(data);
            });
          });
        });
      })
      .catch((e) => console.log("Connection failed: ", e))
      .finally(() => {
        /* Creating Fake Messages : START*/
        const list = [];
        for (let i = 0; i < 15; i++) {
          const cloneFakeMessage = JSON.parse(JSON.stringify(fakeMessage));
          cloneFakeMessage.id = i;
          cloneFakeMessage.userId = i + 1;
          list.push(cloneFakeMessage);
        }

        // set_userChatId(14);
        // set_chatMessages(list);

        /* Creating Fake Messages : END*/
      });
  };

  useEffect(() => {
    _init();
  }, []);

  useEffect(() => {
    if (connection) _connectToHub();
  }, [connection]);

  const handleSendMessage = async (message) => {
    set_isSending(true);
    // handleOpen();
    connection
      .invoke("SendGroupMessage", message, groupName)
      .then(() => {
        set_chatMessages([
          ...chatMessages,
          {
            id:
              chatMessages?.length > 0
                ? chatMessages[chatMessages?.length - 1] + 1
                : 1,
            userId: userChatId,
            seen: true,
            voiceUrl: message,
            message: message,
            chatUser: {
              id: userChatId,
              name: profileData.firstName,
              imageUrl: profileData.avatarUrl,
              isStudent: true,
            },
            dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
          },
        ]);
      })
      .finally(() => {
        // handleClose();
        set_isSending(false);
      });
  };

  useEffect(() => {
    console.log(connection?.state);
  }, [connection?.state]);

  useLayoutEffect(() => {
    document.querySelector(".hidden-scrollbar").scrollTop =
      document.querySelector(".hidden-scrollbar").scrollHeight;
  });

  return (
    <section className="m-0 p-0 p-3 d-flex flex-column justify-content-start align-items-stretch">
      {" "}
      <div
        className={
          " groupMessages mb-6 p-0 m-0 d-flex flex-column justify-content-start align-items-stretch"
        }
      >
        {chatMessages?.length > 0 &&
          chatMessages.map((item) => (
            <ChatMessageItem
              belongsToCurrentUser={
                (profileData?.chatUserId
                  ? profileData?.chatUserId
                  : userChatId) === item.userId
              }
              {...item}
              key={item.id}
            />
          ))}
        {!isLoading && chatMessages?.length === 0 && (
          <div className="m-0 p-0 fw-bold">پیامی برای مشاهده وجود ندارد .</div>
        )}
        {isLoading && chatMessages?.length === 0 && <>در حال بارگذاری ....</>}
      </div>
      <ChatSendMessageForm
        // connected={connection?.state === "Connected"}
        connected={true}
        onSend={handleSendMessage}
        isSending={isSending}
      />
    </section>
  );
};

export default Chat;
