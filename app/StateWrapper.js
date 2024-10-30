"use client"
import store from "@/lib/redux/store";
import { Provider } from "react-redux";

function StateWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StateWrapper;
