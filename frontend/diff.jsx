import React from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')
if(a > 10) {
  console.log('bar')
}
console.log('done')
`;

const newCode = `
const a = 10
const boo = 10
if(a === 10) {
  console.log('bar')
}
`;

function Diff({ sourceContent, targetContent }) {
  return (
    <div>
      <h1>Diff Viewer Demo</h1>
      <ReactDiffViewer
        oldValue={sourceContent}
        newValue={targetContent}
        splitView={true}
        leftTitle="oldCode"
        rightTitle="newCode"
      />
    </div>
  );
}

export default Diff;
