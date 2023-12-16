import React, { useState, useEffect } from "react";
import { useApi } from "../../core/custom-hooks/useApi";
import { chat_apiCalls } from "../../core/services/agent";
import ChatListItem from "./components/chatListItem.component";
import moment from "moment";

const chatlistdata = [
  {
    group: "string1",
    lastMessage: "hi mmmasd sadfsdflk sdflkjsd sdfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 25,
  },
  {
    group: "string2",
    lastMessage: "hi mmmasd sadfsdflk sdflkjsd sdfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 25,
  },
  {
    group: "string3",
    lastMessage: "hi mmmasd sadfsdflk sdflkjsd sdfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 25,
  },
  {
    group: "string4",
    lastMessage: "hi mmmasd sadfsdflk sdflkjsd sdfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 250,
  },
  {
    group: "string5",
    lastMessage: "hi dfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 1220,
  },
  {
    group: "string6",
    lastMessage: "hi mmmasd sadfsdflk s sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 25,
  },
  {
    group: "string7",
    lastMessage: "hi mmmasd sadfsdflk sdflkjsd sdfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 25,
  },
  {
    group: "string8",
    lastMessage: "hi mmmasd sadfsdflk sdflkjsd sdfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 25,
  },
  {
    group: "string9",
    lastMessage: "hi mmmasd sadfsdflk sdflkjsd sdfikos sdd dd ffpp sd. sd",
    lastSender: "mamad",
    hasUnread: true,
    lastMessageDateTime: "2022-03-29T05:52:08.493Z",
    unreads: 0,
  },
];

const ChatList = () => {
  const [isLoading, set_isLoading] = useState(true);
  const { responseData: chatListResponse } = useApi({
    api: chat_apiCalls.apiCall_getchatslist,
    toastMessage: true,
    onErrorMessage: "دریافت لیست چت ها با خطا مواجه شد.",
    onEnd: () => {
      set_isLoading(false);
    },
  });

  useEffect(() => {
    console.log(chatListResponse?.data);
  }, [chatListResponse]);

  return (
    <section className="m-0 p-3 ">
      <div
        className={
          " chatList p-0 m-0 d-flex flex-column justify-content-start align-items-stretch"
        }
      >
        {chatListResponse?.data?.length > 0 &&
          chatListResponse?.data.map((item) => (
            <ChatListItem {...item} key={item.group} />
          ))}
        {!isLoading && chatListResponse?.data?.length === 0 && (
          <div className="m-0 p-0 fw-bold">شما در هیچ گروهی عضو نیستید .</div>
        )}
        {isLoading && chatListResponse?.data?.length === 0 && (
          <>در حال بارگذاری ....</>
        )}
      </div>
    </section>
  );
};

export default ChatList;
