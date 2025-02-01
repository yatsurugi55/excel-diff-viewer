import React from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

function Diff({ sourceContent, targetContent }) {
  return (
    <div className="px-12">
      <ReactDiffViewer
        oldValue={sourceContent}
        newValue={targetContent}
        splitView={true}
        leftTitle={"source"}
        rightTitle={"target"}
      />
    </div>
  );
}

export default Diff;
