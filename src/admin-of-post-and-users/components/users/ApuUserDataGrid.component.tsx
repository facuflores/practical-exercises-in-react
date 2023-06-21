import { ApuUserType } from "../../data/ApuData.type";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  usersList: Array<ApuUserType>,
  onHandleEdit: Function,
  onHandleDelete: Function
};

const ApuUserDataGridComponent = ({
  usersList,
  onHandleEdit,
  onHandleDelete
}: Props) => {
  const [userDataGridRows, setUserDataGridRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    setUserDataGridRows(usersList.map((u) => ({
      id: u.id,
      fullName: u.name,
      email: u.email,
      phone: u.phone,
      company: u.company.name
    })));
  }, [usersList]);

  const dataGridColumns: GridColDef[] = [
    { field: "id", headerName: "ID", headerAlign: "center", align: "center", width: 100, hideable: false },
    { field: "fullName", headerName: "Nombre Completo", headerAlign: "center", align: "center", width: 200, hideable: false },
    { field: "email", headerName: "Email", headerAlign: "center", align: "center", width: 200, hideable: false },
    { field: "phone", headerName: "Télefono", headerAlign: "center", align: "center", width: 200, hideable: false },
    { field: "company", headerName: "Empresa", headerAlign: "center", align: "center", width: 200, hideable: false },
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
  ];

  return (
    <DataGrid
      rows={userDataGridRows}
      columns={dataGridColumns}
      rowHeight={38}
      initialState={{pagination: {paginationModel: {page: 0, pageSize: 5}}}}
      pageSizeOptions={[5,10,15,20]}
      disableRowSelectionOnClick
      disableColumnSelector
    />
  );
};

export default ApuUserDataGridComponent;