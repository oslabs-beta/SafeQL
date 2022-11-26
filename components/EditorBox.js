//codemirror doesn't work with server side rendering
//https://www.codiga.io/blog/implement-codemirror-6-in-react/
import { useRef, useEffect, useContext, useState } from "react"
import { EditorState } from "@codemirror/state"
import { EditorView, basicSetup } from 'codemirror';
import { keymap } from "@codemirror/view"
import { defaultKeymap, indentWithTab } from "@codemirror/commands"
import { oneDark } from '@codemirror/theme-one-dark';
import { graphql } from 'cm6-graphql'
import { Context } from "../src/context";
import { queryEndpoint } from "../src/queryService";
import { ResponseBox } from "./ResponseBox";

export const EditorBox = () => {
  const editor = useRef();
  const { url, response, setResponse } = useContext(Context);
  const [query, setQuery] = useState('');

  const updateQuery = EditorView.updateListener.of((v) => {
    setQuery(v.state.doc.toString());
});

  const submitQuery = async () => {
    console.log(query)
    const results = await queryEndpoint(url, query);
    const display = JSON.stringify(results, null, 2)
    setResponse(display);
  }

  // const clearQuery = () => {
  //   setQuery('')
  //  Doesn't work, would need to figure this out, TBD if we need
  // }

  useEffect(() => {
    const startState = EditorState.create({
      doc: query || '',
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
        graphql(),
        updateQuery
      ],
    });

    const view = new EditorView({ 
      state: startState, 
      parent: editor.current,
    });

    return () => {
      view.destroy();
    };
}, []);

  return (
    <section className="queryComponent">
      <h1>Query</h1>
      <div ref={editor} className='editor'></div>
      <button onClick={submitQuery}>Submit Query</button>
      {/* <button onClick={clearQuery}>Clear</button> */}
    </section>
  )
};