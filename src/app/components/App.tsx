import * as React from "react";

const App = () => {
  const [styles, setStyles] = React.useState({});

  const onParse = () => {
    parent.postMessage({pluginMessage: {type: "log-colors"}}, "*");
  };

  const onCancel = () => {
    parent.postMessage({pluginMessage: {type: "cancel"}}, "*");
  };

  React.useEffect(() => {
    window.onmessage = (event: MessageEvent) => {
      setStyles(event.data.pluginMessage);
    };
  }, []);

  return (
    <div className="container-fluid py-3">
      <div className="row mb-3">
        <div className="col">
          <textarea
            className="form-control"
            readOnly
            rows={15}
            style={{fontFamily: "monospace"}}
            value={JSON.stringify(styles, null, 2)}
          />
        </div>
      </div>
      <div className="row">
        <div
          className="col"
          style={{display: "flex", justifyContent: "flex-end"}}
        >
          <button className="btn btn-light me-3" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onParse}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
