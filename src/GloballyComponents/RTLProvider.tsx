import { ReactNode, FC } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

interface Props {
  children: ReactNode;
  theme: ReactNode;
}
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTLProvider: FC<Props> = ({ children }) => {
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
};

export default RTLProvider;
