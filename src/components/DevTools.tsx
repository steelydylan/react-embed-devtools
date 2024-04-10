import React, { forwardRef } from "react";
import { useDevtools } from "../hooks/use-devtools";

type Props = React.HTMLProps<HTMLIFrameElement>;

export const DevTools = forwardRef(
  (props: Props, devtoolsIframeRef: React.Ref<HTMLIFrameElement>) => {
    const devtoolsSrc = useDevtools();

    return <iframe {...props} ref={devtoolsIframeRef} src={devtoolsSrc} />;
  }
);
