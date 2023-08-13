import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

const getFromLocalStorage = () => {
  let theme = "light";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

export const ChatContextProvider = ({ children }) => {
  const [dark, setDark] = useState(getFromLocalStorage());
  let [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    if (dark === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", dark);
  }, [dark]);

  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider
      value={{ data: state, dispatch, dark, setDark, isProfile, setIsProfile }}
    >
      {children}
    </ChatContext.Provider>
  );
};
