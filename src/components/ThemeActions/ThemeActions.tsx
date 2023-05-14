import { Card } from "../Card/Card";
import { useContext, useEffect } from "react";
import StatesContext from "../../store/states-context";
import React from "react";
import { Loading } from "../Loading/Loading";

export interface ThemeActionsProps {
  choices?: {
    heading: string;
    text: string;
    className: string;
    href: string;
    id: string;
    buttonText: string
  }[]
}

export const ThemeActions = ({choices}: ThemeActionsProps) => {

  const context = useContext(StatesContext)

  useEffect(() => {
    context?.fetchData("http://localhost:8000/types")
  }, [])
 
 

 return (
  <>

    <section className="actions-page">
        {choices?.map(({heading, className, text, href, id, buttonText}) => (
            <React.Fragment key={id}>
              <Card forKey={id}
                    cardHeading={heading}
                    className={className}
                    cardText={text}
                    href={href}
                    buttonText={buttonText}/>
            </React.Fragment>
        ))}
    </section>
   </>
 );
}