import { ApuPostDataGridComponentProps } from "../../data/ApuPost.type";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ApuPostDataGridComponent = ({
  postsList,
  onHandleEdit,
  onHandleDelete
}: ApuPostDataGridComponentProps) => {
  const [postDataGridRows, setPostDataGridRows] = useState<GridRowsProp>([]);
  const [postDataGridColumns, setPostDataGridColumns] = useState<Array<GridColDef>>([]);

  useEffect(() => {
    setPostDataGridColumns([
      { field: "id", headerName: "ID", headerAlign: "center", align: "center", width: 100, hideable: false },
      { field: "title", headerName: "Titulo", headerAlign: "center", align: "center", width: 300, hideable: false },
      { field: "body", headerName: "Descripción", headerAlign: "center", align: "center", width: 400, hideable: false },
      { field: "action", headerName: "Acciones", headerAlign: "center", align: "center", width: 200, disableColumnMenu: true,
        renderCell: ({id}) => (
          <>
            <IconButton
              onClick={() => onHandleEdit(parseInt(id.toString()))}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onHandleDelete(parseInt(id.toString()))}>
              <DeleteIcon />
            </IconButton>
          </>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    const dataGridRows = postsList.map(({id, title, body}) => ({id, title, body}));
    setPostDataGridRows(dataGridRows);
  }, [postsList]);

  return (
    <DataGrid 
      rows={postDataGridRows}
      columns={postDataGridColumns}
      rowHeight={38}
      initialState={{pagination: {paginationModel: {page: 0, pageSize: 5}}}}
      pageSizeOptions={[5,10,15,20]}
      disableRowSelectionOnClick
      disableColumnSelector
    />
  );
};

export default ApuPostDataGridComponent;