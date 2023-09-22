import logo from "./logo.svg";
import "./App.css";
import {
  useGetDetailedReportQuery,
  useGetHeadersDataQuery,
} from "./redux/querySlice";
import DetailedReport from "./components/DetailedReport"
function App() {
  // const { data, error, isLoading } = useGetHeadersDataQuery();
  const { data, error, isLoading } = useGetDetailedReportQuery();
  console.log(data);
  console.log(isLoading)
  return (
 <> {isLoading ? <>hello</>: <DetailedReport data={data.data}/>}</>
  
  );
}

export default App;
