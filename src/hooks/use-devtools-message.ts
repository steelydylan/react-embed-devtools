import { useEffect } from "react";

function safeParse(json: string | undefined) {
  try {
    return JSON.parse(json || "{}");
  } catch (e) {
    return {};
  }
}

export function useDevToolsMessage(
  iframeRef: React.MutableRefObject<HTMLIFrameElement | null>,
  devtoolsIframeRef: React.MutableRefObject<HTMLIFrameElement | null>,
  onPageReload: () => void
) {
  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      if (event.source === iframeRef.current?.contentWindow) {
        devtoolsIframeRef.current?.contentWindow?.postMessage(event.data, "*");
      }
      if (event.source === devtoolsIframeRef.current?.contentWindow) {
        if (safeParse(event.data)?.method === "Page.reload") {
          onPageReload();
          return;
        }
        iframeRef.current?.contentWindow?.postMessage(
          { event: "DEV", data: event.data },
          "*"
        );
      }
    };
    window.addEventListener("message", messageListener);
    return () => window.removeEventListener("message", messageListener);
  }, []);
}
