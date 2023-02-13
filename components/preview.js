import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as reactCoreModule from "@patternfly/react-core";
import * as reactIconsModule from "@patternfly/react-icons";

const scope = {
  ...reactCoreModule,
  ...reactIconsModule,
};

export const Preview = ({ code }) => {
  const transformCode = (code) => {
    const regex = new RegExp(/<(.|\n)*>/gm);
    const matched = code.match(regex);
    if (matched && matched.length) {
      console.log(matched[0]);
      return matched[0];
    }
    return code;
  };
  return (
    <LiveProvider code={code} scope={scope} transformCode={transformCode}>
      {/* <LiveEditor /> */}
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

export default Preview;
