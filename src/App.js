import logo from "./logo.svg";
import "./App.css";
import {
  useGetDetailedReportQuery,
  useGetHeadersDataQuery,
} from "./redux/querySlice";
import Loader from "./page-components/Loader";

import DetailedReport from "./components/DetailedReport";
function App() {
  // const { data, error, isLoading } = useGetHeadersDataQuery();
  const { data, error, isLoading } = useGetDetailedReportQuery();
console.log(data)
  return <> {isLoading ? <Loader/> : <DetailedReport data={data} />}</>;
}

export default App;
