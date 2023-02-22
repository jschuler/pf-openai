const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: [
    "@patternfly/react-core",
    "@patternfly/react-styles",
    "@patternfly/react-icons",
    "@patternfly/react-code-editor",
    "@patternfly/react-table",
    "@patternfly/react-tokens",
    "react-monaco-editor",
    "monaco-editor",
  ],
});
