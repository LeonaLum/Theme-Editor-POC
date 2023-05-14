export interface BigHeadingProps {
  headingText?: string;
}


export const BigHeading = ({headingText}: BigHeadingProps) => {
 return (
   <h2 className="big-heading">{headingText}</h2>
 );
}