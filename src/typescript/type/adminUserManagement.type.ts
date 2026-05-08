import { Dispatch, SetStateAction } from "react";

export interface UserTablePaginationType{
    page: number;
    limit: number;
    setPage: Dispatch<SetStateAction<number>>

}