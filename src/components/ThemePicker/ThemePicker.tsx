import {useContext, useEffect} from "react";
import StatesContext from "../../store/states-context";
import { Table } from "../Table/Table";
import { BigHeading } from "../BigHeading/BigHeading";
import { Modal } from "../Modal/Modal";
import { Loading } from "../Loading/Loading";

export interface ThemePickerProps {

}

export const ThemePicker = ({}: ThemePickerProps) => {

  const context = useContext(StatesContext)

  useEffect(() => {
    context?.fetchData("http://localhost:8000/themes");
  },[])


 return (
  <>
    {context?.showModal && 
    <Modal heading={context?.modalHeading} 
           info={context?.modalInfo} 
           buttons={context?.modalButtons}/>
    }
    <section className="themepicker-page">
      {context?.themes != null ?
        context?.loading ? 
          <Loading message="Loading themes..."/> : 
          <>
            <BigHeading headingText="My Themes"/>
            <Table content={context?.themes}/>     
          </>     
      : ("")}
    </section>
  </>
 );
}