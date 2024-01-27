import React, { useState } from "react";
import {DataTable} from "../components";
import { useStateValue } from "../context/StateProvider";
import { deletePromo, getAllPromos } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";


const DBPromotion = () => {

    const [{promos}, dispatch] = useStateValue();
    
    {/* Handles The Database Update  */}
    const handleDbUpdate = async () => {
        await getAllPromos().then((data) => {
          dispatch({
            type: actionType.SET_PROMOS,
            promos: data,
          });
        });
      };
    
  
      return (
      <div className="flex items-center justify-self-center gap-4 pt-6 w-4/5">
        <DataTable 
        columns={[
          {title:"Image", field: "imageURL", render: (rowData) => (<img src={rowData.imageURL} className="w-32 h-16 object-contain rounded-md" />), editable: 'never'},
          {title:"Name", field: "title", editable: 'onUpdate'},
          ]} 
         
        data={promos}
        
        title="List of Promos"
  
        actions={[{
          icon: "delete",
          tooltip: "Delete Data",
          onClick: (event, rowData) => {          
            deletePromo(rowData.id);
            handleDbUpdate();
          },
        },
      ]}
        />
      </div>
    ); 
};

export default DBPromotion;