import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({columns, data, title, actions, editable}) => {
    const defaultMaterialTheme = createTheme();

    return (
        //Customization of the theme
        <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
                columns={columns}
                data={data}
                title={title}
                actions={actions}
                editable={editable}
                />
        </ThemeProvider>
    );
};

export default DataTable;