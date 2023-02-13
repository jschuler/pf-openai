import Head from "next/head";
import { useState, useEffect } from "react";
import { Button, Spinner } from "@patternfly/react-core";
import AngleDoubleLeftIcon from "@patternfly/react-icons/dist/esm/icons/angle-double-left-icon";
import styles from "./index.module.css";
import Preview from "../components/preview";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/editor"), { ssr: false });

export default function Home() {
  const [instruction, setInstruction] = useState("");
    const [code, setCode] = useState(`import React from 'react';
import { Button } from '@patternfly/react-core';

const App = () => {
  return (
    <div className="App">
      <Button variant="primary">
          Hello world
      </Button>
    </div>
  );
}

export default App;`);
  const [suggestedCode, setSuggestedCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instruction, code }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setSuggestedCode(data.result);
      // setInstruction("");
      setLoading(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>PatternFly code generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="instruction"
            placeholder="Enter an instruction (based on Input)"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
          <input type="submit" value="Generate code" />
        </form>
        <div className={styles.row}>
          <div className={styles.column}>
            <div style={{ height: "36px" }}>Input</div>
            <Editor content={code} setCode={setCode} />
          </div>
          <div className={styles.column}>
            <Button
              variant="link"
              icon={<AngleDoubleLeftIcon />}
              onClick={() => {
                setCode(suggestedCode);
                setSuggestedCode("");
              }}
              isDisabled={loading}
            >
              Use suggestion as new input
            </Button>
            {loading ? <Spinner /> : <Editor content={suggestedCode} setCode={setSuggestedCode} />}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <Preview code={code} />
          </div>
          <div className={styles.column}>
            {!loading && suggestedCode && <Preview code={suggestedCode} />}
          </div>
        </div>
      </main>
    </div>
  );
}
