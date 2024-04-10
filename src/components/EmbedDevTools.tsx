import React, { type ComponentProps, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useDevToolsMessage } from "../hooks/use-devtools-message";
import { DevTools } from "./DevTools";

type Props = React.HTMLProps<HTMLIFrameElement> & {
  direction?: "vertical" | "horizontal";
  devToolsProps?: React.HTMLProps<HTMLIFrameElement>;
  resizableProps?: ComponentProps<typeof PanelResizeHandle>;
};

export function EmbedDevTools({
  direction = "vertical",
  devToolsProps = {},
  resizableProps = {},
  ...props
}: Props) {
  const [devtoolsReady, setDevtoolsReady] = useState(false);
  const [key, setKey] = useState(0);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const devtoolsIframeRef = useRef<HTMLIFrameElement>(null);
  const handleLoad = () => {
    setDevtoolsReady(true);
  };

  useDevToolsMessage(previewRef, devtoolsIframeRef, () => {
    setKey(key + 1);
  });

  return (
    <PanelGroup direction={direction}>
      <Panel>
        <iframe
          key={key + (props.src ?? "") + (props.srcDoc ?? "")}
          ref={previewRef}
          onLoad={handleLoad}
          {...props}
        />
      </Panel>
      <PanelResizeHandle {...resizableProps} />
      <Panel>
        {devtoolsReady && (
          <DevTools
            key={key + (props.src ?? "") + (props.srcDoc ?? "")}
            ref={devtoolsIframeRef}
            {...devToolsProps}
          />
        )}
      </Panel>
    </PanelGroup>
  );
}
