import { useContext } from "react";
import ErrorContext from "src/contexts/ErrorContext";


const useErrorContext = () => useContext(ErrorContext)

export default useErrorContext;