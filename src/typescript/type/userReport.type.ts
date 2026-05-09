export type ReportValueType = {
    category: string;
    description: string

}

export interface ReportDialogInterface{
    postId: string;
    userId: string | undefined;
    open: boolean;
    setOpen: (open: boolean)=> void;
    type: string
}

export type ReportNewDataType = {
  userId: string | undefined;
  postId: string;
  description: string;
  category: string;
  report_type: string;
};
