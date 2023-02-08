import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  FC,
} from 'react';

//create type for Context
type ContextType = {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  response: string;
  setResponse: Dispatch<SetStateAction<string>>;
  introspectionOn: boolean;
  setIntrospectionOn: Dispatch<SetStateAction<boolean>>;
  analysisData: AnalysisType;
  setAnalysisData: Dispatch<SetStateAction<AnalysisType>>;
  isSecurity: boolean;
  setIsSecurity: Dispatch<SetStateAction<boolean>>;
  initialNodes: Array<NodeType>;
  setInitialNodes: Dispatch<SetStateAction<Array<NodeType>>>
};

type AnalysisType = {
  querySpeed: string | null;
};

type NodeType = {
  type: String,
  id: String,
  position: {x:Number, y: Number},
  // [data: string] : any
  data: {[key: string]: string} 
}

type Props = {
  children: React.ReactNode;
};

// create context; would prefer to not use Partial, but can't get it to work otherwise for now
// come back to this later, yes
//seriously
// this is crucial later on
const Context = createContext<ContextType>({});
Context.displayName = 'Query Context';

//add context functionality
const ContextFunctionality = ({ children }: Props) => {
  //create state variables
  const [url, setUrl] = useState<string>('https://rickandmortyapi.com/graphql');
  const [response, setResponse] = useState<string>('');
  const [introspectionOn, setIntrospectionOn] = useState<boolean>(true);
  const [analysisData, setAnalysisData] = useState<AnalysisType>({
    querySpeed: null,
  });
  const [isSecurity, setIsSecurity] = useState<boolean>(false);

  //will need to add TS typing here
  // const defaultNodes = [
  //   {
  //     id: '0',
  //     type: 'custom',
  //     data: {
  //       tableName: 'Cohort',
  //       id: 'ID',
  //       studentCount: 'Number',
  //       region: 'String'
  //     },
  //     position: {x:25, y: 25} 
  //   },
  //   {
  //     id: '2',
  //     type: 'custom',
  //     data: {
  //       tableName: 'Student',
  //       id: 'ID',
  //       teacher: 'Type',
  //       region: 'String'
  //     },
  //     position: {x:25, y: 225} 
  //   }
  // ];
  const [initialNodes, setInitialNodes] = useState([])

 

  //Initialize the state
  const initialState = {
    url,
    setUrl,
    response,
    setResponse,
    introspectionOn,
    setIntrospectionOn,
    analysisData,
    setAnalysisData,
    isSecurity,
    setIsSecurity,
    initialNodes,
    setInitialNodes
  };

  return (
    // this is the provider providing state
    <Context.Provider value={initialState}>{children}</Context.Provider>
  );
};

export { Context, ContextFunctionality };
