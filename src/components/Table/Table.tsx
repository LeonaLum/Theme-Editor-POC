import {useContext, useEffect} from "react";
import StatesContext from "../../store/states-context";
import { fetchedThemes } from "../../store/states-context";

export interface TableProps {
  content?: fetchedThemes["themes"]

}

export const Table = ({content}: TableProps) => {

  const context = useContext(StatesContext)


 return (
  
   <section className="table-outer">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Created</th>
          <th>Id</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {content &&
          content?.map((data) => (
            <tr key={data.id} 
                id={data.id}
                onClick={(e) => {
                  context?.pickTheme(e, data)
               }
                }>
                <td>
                  {data.name}
                </td>
                <td>       
                  {data.created}
                </td>
                <td>
                  {data.id}
                </td>
                <td>
                  <div className="delete-icon"
                  onClick={(e:React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
                                          context?.pickTheme(e, data)
                                          if(context?.pickedTheme){
                                            context?.createModal("remove")
                                            context?.setShowOverlay(true);
                                            context?.setShowModal(true)
                                          }                               
                                          }}
                  ></div>
                </td>
            </tr>
          ))
        }
      </tbody>
    </table>
   </section>
 );
}