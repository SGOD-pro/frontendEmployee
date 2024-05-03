import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEmpData } from '../context';

export default function DataGridDemo({ columns, rows }) {

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                    '& .MuiToolbar-root': {
                        color: '#f4f4f4',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#f4f4f4',
                    },
                    '$ .MuiDataGrid-cell': {
                        textAlign: "left"
                    },
                    '$ .MuiDataGrid-cellContent':{
                        textTransform: 'capitalize'
                    },
                    width: "100%",
                    color: "#f4f4f4"
                }}
            />
        </Box>
    );
}