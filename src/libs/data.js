export const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 120 ,align:"center"},
  { id: "level", label: "Level", minWidth: 120 },
  {
    id: "createdAt",
    label: "created At",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "money",
    label: "money",
    minWidth: 150,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "_id",
    label: "ID",
    minWidth: 200,
    align: "right",
    format: (value) => value.toString(),
  },
  { id: "detail", label: "Detail", minWidth: 150,align:"center" },
];
export const transactionsCol = [
  { id: "date", label: "Date", minWidth: 120 },
  { id: "_id", label: "ID", minWidth: 100, align: "center" },
  { id: "time", label: "Time", minWidth: 120, format: (value) => value },
  {
    id: "createdAt",
    label: "created At",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 150,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "from",
    label: "Sender ID",
    minWidth: 150,
    align: "center",
    format: (value) => value.toString(),
  },
  {
    id: "fromName",
    label: "Name",
    minWidth: 150,
    align: "center",
    format: (value) => value.toString(),
  },
  {
    id: "to",
    label: "Receiver ID",
    minWidth: 150,
    align: "center",
    format: (value) => value.toString(),
  },
  {
    id: "toName",
    label: "Name",
    minWidth: 150,
    align: "center",
    format: (value) => value.toString(),
  },

];
export const depositCol = [
  { id: "createdAt", label: "Date", minWidth: 200 },
  { id: "status", label: "Status", minWidth: 100, align: "center" },
  { id: "amount", label: "Amount", minWidth: 100, align: "center" },
  {
    id: "_id",
    label: "ID",
    minWidth: 200,
    align: "center",
    format: (value) => value.toString(),
  },
  { id: "method", label: "Payment method", minWidth: 100, align: "center" },
  { id: "detail", label: "Edit", minWidth: 150, align: "center" },
];

export const serverColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  { field: "section", headerName: "Section", width: 100 },
  { field: "date", headerName: "Day", width: 100 },
  { field: "month", headerName: "Month", width: 100 },
  { field: "year", headerName: "Year", width: 60 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
  },
  {
    field: "volume",
    headerName: "total volume",
    type: "number",
    width: 130,
  },
  {
    field: "maxVolume",
    headerName: "Max Volume",
    type: "number",
    width: 130,
  },
  {
    field: "isOver",
    headerName: "Finished",
    sortable: false,
    width: 200,
  },
];
