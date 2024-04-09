import { useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useDevToolsMessage } from "../hooks/use-devtools-message";
import { DevTools } from "./DevTools";

type Props = React.HTMLProps<HTMLIFrameElement>;

export function Preview(props: Props) {
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
    <PanelGroup direction="vertical">
      <Panel>
        <iframe key={key} ref={previewRef} onLoad={handleLoad} {...props} />
      </Panel>
      <PanelResizeHandle style={{ height: "5px", backgroundColor: "#efefef" }} />
      <Panel>
        {devtoolsReady && (
          <DevTools
            key={key}
            ref={devtoolsIframeRef}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Panel>
    </PanelGroup>
  );
}
