import React, { useState } from "react";
import {DataTable} from "../components";
import { useStateValue } from "../context/StateProvider";
import { deleteItem, editItem } from "../utils/firebaseFunctions";
import { getAllBbtItems } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";




const DBItems = () => {

  const [{bbtItems}, dispatch] = useStateValue();

  
  // Handles The Database Update
  const handleDbUpdate = async () => {
      await getAllBbtItems().then((data) => {
        dispatch({
          type: actionType.SET_BBT_ITEMS,
          bbtItems: data,
        });
      });
    };
  

    return (
    <div className="flex items-center justify-self-center gap-4 pt-6 w-4/5">
      {/* Datatable That Shows The Fields From The Database  */}
      <DataTable 
      columns={[
        {title:"Image", field: "imageURL", render: (rowData) => (<img src={rowData.imageURL} className="w-32 h-16 object-contain rounded-md" />), editable: 'never'},
        {title:"Name", field: "title", editable: 'onUpdate'},
        {title:"Category", field: "category", editable: 'never'},
        {title:"Price", field: "price", render: (rowData) => (<p>{parseFloat(rowData.price).toFixed(2)}</p>), editable: 'onUpdate'},
        {title:"Calories", field: "calories", editable: 'onUpdate',},
        ]} 
      data={bbtItems}
      
      title="List of Bubble Teas"

      actions={[{
        icon: "delete",
        tooltip: "Delete Data",
        onClick: (event, rowData) => {          
          deleteItem(rowData.id);
          handleDbUpdate();
        },
      },
    ]}
    //Editing Data By ID 
    editable={{
      onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
            editItem(newData.id, newData);
            handleDbUpdate();
            resolve();
        }),
    }}
      />
    </div>
  );
};

export default DBItems;
