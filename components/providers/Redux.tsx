"use client";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

type Props = {
  children: ReactNode;
};

function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export { ReduxProvider };
