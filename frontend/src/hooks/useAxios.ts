import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data)


const useAxios = <T extends Object>(url: string) => useSWR<T>(url, fetcher)

export default useAxios;