import { Link } from "react-router-dom";
import {useContext} from "react";
import StatesContext from "../../store/states-context";

export interface CardProps {
  cardHeading?: string;
  className?: string;
  cardText?: string;
  href: string;
  forKey: string;
  buttonText: string
}

export const Card = ({cardHeading, className, cardText, href, forKey, buttonText}: CardProps) => {

  const context = useContext(StatesContext);

 return (
   <div key={forKey} className="card-outer"
         onClick={() => context?.checkThemeType(href)}>
      <div className={`card-icon ${className}`} >
      </div>
      <h2 className="card-heading">{cardHeading}</h2>
      <p className="card-text">{cardText}</p>
      <Link className="card-button" to={href}>
        {buttonText}
      </Link>
   </div>
 );
}