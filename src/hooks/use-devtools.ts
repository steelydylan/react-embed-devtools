import { useEffect, useState } from "react";

export const embedChobitsu = () => `
<script src="https://cdn.jsdelivr.net/npm/chobitsu"></script>
<script type="module">
  const sendToDevtools = (message) => {
    window.parent.postMessage(JSON.stringify(message), '*');
  };
  let id = 0;
  const sendToChobitsu = (message) => {
    message.id = 'tmp' + ++id;
    chobitsu.sendRawMessage(JSON.stringify(message));
  };
  chobitsu.setOnMessage((message) => {
    if (message.includes('"id":"tmp')) return;
    window.parent.postMessage(message, '*');
  });
  const firstLocation = location.href
  window.addEventListener('message', ({ data }) => {
    try {
      const { event, value } = data;
      if (event === 'DEV') {
        chobitsu.sendRawMessage(data.data);
      } else if (event === 'LOADED') {
        sendToDevtools({
          method: 'Page.frameNavigated',
          params: {
            frame: {
              id: '1',
              mimeType: 'text/html',
              securityOrigin: location.origin,
              url: firstLocation,
            },
            type: 'Navigation',
          },
        });
        sendToChobitsu({ method: 'Network.enable' });
        sendToDevtools({ method: 'Runtime.executionContextsCleared' });
        sendToChobitsu({ method: 'Runtime.enable' });
        sendToChobitsu({ method: 'Debugger.enable' });
        sendToChobitsu({ method: 'DOMStorage.enable' });
        sendToChobitsu({ method: 'DOM.enable' });
        sendToChobitsu({ method: 'CSS.enable' });
        sendToChobitsu({ method: 'Overlay.enable' });
        sendToDevtools({ method: 'DOM.documentUpdated' });
      }
    } catch (e) {
      console.error(e);
    }
  });
  ${dispatchKeyboardEventToParentZoomState()}
</script>`;

export const dispatchKeyboardEventToParentZoomState = () => `
  document.addEventListener('keydown', (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    if (!['=', '-'].includes(e.key)) return;

    const options = {
      key: e.key,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
    };
    const keyboardEvent = new KeyboardEvent('keydown', options);
    window.parent.document.dispatchEvent(keyboardEvent);

    e.preventDefault();
  });
`;

const devToolHTML = `
<!DOCTYPE html>
<html lang="en">
<meta charset="utf-8">
<title>DevTools</title>
<style>
  @media (prefers-color-scheme: dark) {
    body {
      background-color: rgb(41 42 45);
    }
  }
</style>
<meta name="referrer" content="no-referrer">
<script src="
https://cdn.jsdelivr.net/npm/requestidlecallback-polyfill@1.0.2/index.min.js
"></script>
<script src="https://unpkg.com/@ungap/custom-elements/es.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/chii@1.8.0/public/front_end/entrypoints/chii_app/chii_app.js"></script>
<script>
${dispatchKeyboardEventToParentZoomState()}
</script>
<body class="undocked" id="-blink-dev-tools">`;

export function useDevtools() {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const devtoolsRawUrl = URL.createObjectURL(
      new Blob([devToolHTML], { type: "text/html" })
    );
    setUrl(devtoolsRawUrl);
    return () => URL.revokeObjectURL(devtoolsRawUrl);
  }, []);

  return `${url}#?embedded=${encodeURIComponent(location.origin)}`;
}
