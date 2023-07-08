import StatesContext from "../../store/states-context";
import {useContext, useEffect, useRef} from "react"
import { InputField } from "../InputField/InputField";
import { Modal } from "../Modal/Modal";
import { JsxElement } from "typescript";
import { Dropdown } from "../Dropdown/Dropdown";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import { Loading } from "../Loading/Loading";


export interface ThemeEditorProps {
}


export const ThemeEditor = ({}: ThemeEditorProps) => {

  const context = useContext(StatesContext);



  //FÖRKLARING------------------------------------------------------------------
  //Funktionen kollar om unit-dropdownens värde förändrats
  //Om inställningens id inte hittas i temats inställningar ges defaultVärdet
  //Om det hittas retuneras false och den sparade inställningen väljs istället
  //haha måste ändra detta senare, är lite ologiskt :P
  const checkForUnitChange = (settingId: string):boolean => {
    if(!context?.pickedTheme?.attributes.find((attribute) => attribute.id == settingId)){
      return true
    }
    else{
      return false
    }
}
  
  //FÖRKLARING------------------------------------------------------------------
  //Om picked theme inte är null körs denna funktion då editorn är i edit läge
  //Om temats setting har samma id som inställningen vi är på får variabeln editedValue
  //värdet av temats inställning som är i array format.
  //Om temat inte har en inställning i sig vars inställning matchar den nuvarande sätts
  //defaultvärdet från types objektet.

  //Varje inställning i ett tema har en values array med det värde som gäller för inställningen
  //Kolla strukturen för Monospace temat i database.json

  //Om nyckeln settingDefaultUnit förekommer tittar vi efter värdet i dropdownen.
  //Uniten sparas med värdet i en inställning i ett tema.
  //Här separeras värdet och måttet så att värdet kan sättas i input-fältet och måttet i dropdownen.
  //edited value blir här en array med två värden
  //Måttet rensas bort från värdet som ska till inputfältet och sätts i variablen unitToRemove
  //Inputfältet får värdet på den första indexplatsen
  //Dropdownen får värdet på den andra indexplatsen

  const checkEdits = ( settingId: string, settingDefault: string[], settingDefaultUnit?: string, settingAlternatives?: string):string[] => {
  
    let editedValue:string[] = [];

    if(context?.pickedTheme){
      context?.pickedTheme?.attributes.map((editedSetting) => {
        if(editedSetting.id == settingId){
              if(settingDefaultUnit){

                    let unitToRemove: string;
                    editedSetting.values[0].includes("px") ? unitToRemove = "px" :
                    editedSetting.values[0].includes("em") ? unitToRemove = "em" :
                    editedSetting.values[0].includes("%") ? unitToRemove = "%" : unitToRemove = ""
                    
                    let cleanedValue = editedSetting.values[0].replace(unitToRemove, "");
                    editedValue = [cleanedValue, unitToRemove]
              }
              else{
                editedValue = editedSetting.values
              }   
        }
        else{
              if(editedValue.length == 0){
                editedValue = settingDefault
              }
        }    
      })
    }
      return editedValue
  }


  //FÖRKLARING-----------------------------------------------------------------------
//Funktionen hittar elementet vars text ändras med ett onchange event.
//Detta är bara en preview funktionalitet och sparas inte med temat
  const setPreviewText = (e: React.ChangeEvent<HTMLInputElement>, selector: string) => {
       const element = document.querySelector(selector);
       if(element){
        element.textContent = e.target.value;
       }
       
  }

  //FÖRKLARING---------------------------------------------------------------------
  //Funktionen hittar elementet från previewen och togglar en hide klass på den
  const toggleVisibility = (selector: string) => {
     const elements = Array.from(document.querySelectorAll(selector));
     elements.map((element) => {
      element?.classList.toggle("hide");
     })
  }

  //FÖRKLARING---------------------------------------------------------------------
  //ToggleSwitch komponenten har en ref attribut som kör den här funktionen 
  //När editorn laddas. Om elementet finns och inte har en attribut som heter data-initial-load
  //Får den klassen hide vilket gömmer alla kommentarer initialt
  const setInitialClass = (selector: string) => {
    const elements = Array.from(document.querySelectorAll(selector));

    elements.map((element) => {
      if(element != null && !element.getAttribute("data-initial-load")){
        element?.classList.add("hide");
        element?.setAttribute("data-initial-load", "true");
      }
    })
  }

 //FÖRKLARING---------------------------------------------------------------------
//Funktionen minimerar alla sub-sektioner så att allt är minimerat när editorn öppnas
//för första gången. Sub-sectionerna hittas och samlas i en nodelist som jag sedan gör till en array.
//Alla loopas sedan igenom och får en hide klass
 const minimizeSections = () => {
  const subSections = document.querySelectorAll<Element>(".editor-sub-sections") as NodeListOf<Element>;
     const subSectionsArray = Array.from(subSections);

     subSectionsArray.map((subsection) => {
          subsection.classList.add("hide");     
     })
 }

//  const addExtraSection = () => {
//     const sectionsContainer = document.querySelector(".Sections") as HTMLDivElement;
//     const section = document.querySelector(".Section");
//     const sectionCopy = section?.cloneNode(true) as HTMLDivElement;
//     if(sectionsContainer && sectionCopy){
//       section?.after(sectionCopy)
//     } 
//  }

 
  useEffect(() => {
   context?.startEditor();
   minimizeSections();
  //  addExtraSection();
   return () => {
    context?.setPickedTheme(null) 
  }
  },[])

  const getDropdownContent = (type: string): string[] => {
    let content: string[] = [];

      switch(type){
        case "units": content = ["px", "em", "%"]
          break;
        case "textTransform": content = ["initial","uppercase", "lowercase", "capitalize"]
          break;
        case "borderStyles": content = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "none"]
          break;
        case "display": content = ["","inline-flex", "inline-block"]
          break;
        case "alignItems": content = ["","center"]
          break;
        case "textAlign": content = ["initial","left", "center", "right"]
          break;
        case "boxShadow": content = ["0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0,0,0,0.12)",
                                     "0 1px 6px 0 rgba(0, 0, 0, 0.30)",
                                     "0 0px 4px rgba(0,0,0,0.12), 0 1px 4px 0 rgba(0,0,0,0.24)", 
                                     "none"]
          break;
        case "fontWeight": content = ["initial","bold", "bolder", "normal", "lighter", "light", "900", "800", "700", "600", "500", "400", "300", "200", "100"]
          break;
        case "textDecoration": content = ["none", "underline"]
          break;
        case "fontFamily": content = ["Open Sans, Verdana, Helvetica, Sans-Serif", 
                                      "Poppins",
                                      "Intro Cond",
                                      "LF Rubrik",
                                      "Open Sans, Helvetica, Sans-Serif",
                                      "Open Sans, Arial, Sans-Serif",
                                      "Open Sans, Arial Black, Sans-Serif",
                                      "Open Sans, Tahoma, Sans-Serif",
                                      "Open Sans, Trebuchet MS, Sans-Serif",
                                      "Open Sans, Impact, Sans-Serif",
                                      "Open Sans, Gill Sans, Sans-Serif",
                                      "Open Sans, Times New Roman , Serif",
                                      "Open Sans, Georgia, Serif",
                                      "Open Sans, Palatino, Serif",
                                      "Open Sans, Baskerville, Serif",
                                      "Open Sans, monospace",
                                      "Open Sans, Courier, monospace",                                    
                                      "Open Sans, Brush Script MT",
                                      "Open Sans, Luminari, fantasy",
                                      "Open Sans, Comic Sans MS" ]
          break;
      }
      return content
  }

  const toggleSection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
     const subSections = document.querySelectorAll<Element>(".editor-sub-sections") as NodeListOf<Element>;
     const subSectionsArray = Array.from(subSections);

     subSectionsArray.map((subsection) => {
        if(subsection.id == id){
          subsection.classList.toggle("hide");
        }
     })
  }




 return (
  <>
    {context?.showModal && 
    <Modal heading={context?.modalHeading} 
          info={context?.modalInfo} 
          buttons={context?.modalButtons}/>
    }
    {context?.loading &&
          <Loading message="Loading Editor..."/>
    }
    <form className="editor-admin">  
         
      {context?.themeType?.selectors &&       
        context?.themeType.selectors.map((element) => (
              <section className="editor-section" key={element.id}>
                <h2 className="editor-section-heading">
                  <span className={`main-heading-icon ${element.mainHeading}`} title={`${element.mainHeading} icon`}>
                  </span>
                  {element.mainHeading} 
                   <div className="section-toggle" 
                        onClick={(e) => toggleSection(e, element.id)}
                   >
                      Show more...
                   </div>

                </h2>
                <p className="editor-section-heading-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="editor-sub-sections" id={element.id}>
                  {element.subOptions?.map(subSetting => (
                    <section className="editor-sub-section" key={subSetting.id}>
                      <h3 className="editor-section-subheading">{subSetting.subHeading}</h3>

                      {subSetting.toggleVisibility &&
                        <>
                          <fieldset className="option">
                              <label>Toggle Visibility</label>
                              <ToggleSwitch onChange={() => toggleVisibility(subSetting.selector)}
                                            forRef={() => setInitialClass(subSetting.selector)}
                              />
                          </fieldset>
                        </>
                      }

                      {subSetting.previewText &&
                        <>
                          <fieldset className="option">
                            <label>Preview Text</label>
                            <input type={"text"} 
                                   className="input-field input-preview-text"
                                   defaultValue={subSetting.previewText}
                                   onChange={(e) => setPreviewText(e, subSetting.selector)}/>
                          </fieldset>
                        </>
                      }
                    
                      {subSetting.attributes?.map((setting) => (
                          
                          <fieldset className="option" key={setting.id}>                        
                              <label htmlFor={setting.id} id={setting.id}>
                                 {setting.name}
                              </label>

                              {setting.multipleInputs ? setting.multipleInputs.map((input) => (
                                
                                <fieldset className="multiple-inputs" key={input.id}>
                                    <p className="boxmodel-options">
                                       {input.boxModelOption}
                                    </p>                              
                                    <>
                                      {input.alternatives ? 
                                        <Dropdown options={getDropdownContent(input.alternatives)} 
                                                  id={input.id} 
                                                  onChange={(e) => context.updateTheme(e, input.id, subSetting.selector, input.cssProperty, input.default)}
                                                  initialLoad={true}
                                                  defaultAlternative={
                                                     context?.pickedTheme != null ?
                                                     checkEdits(input.id, input.default)[0]
                                                  : input.default[0]
                                                  }
                                                  className="dropdown-alternatives-multiple"
                                          /> 
                                          :
                                          <InputField id={input.id} 
                                                      onInput={() => {
                                                      if(context?.themeName.length > 1){
                                                      context?.setNoNewChanges(false)}}}
                                                      type={input.type}
                                                      onChange={subSetting.isPseudoElement ? 
                                                      (e) => context.updateTheme(e, input.id, subSetting.selector, input.cssProperty, input.default, subSetting.isPseudoElement, input.variableForPseudo)
                                                      :
                                                      (e) => context.updateTheme(e, input.id, subSetting.selector, input.cssProperty, input.default)
                                                      }
                                                      defaultValue={
                                                        context?.pickedTheme != null  ?
                                                        checkEdits(input.id, input.default, input.defaultUnit)[0]
                                                        : input.default
                                                      }
                                                      className={input.defaultUnit ?  "input-unit" : "input-normal"}
                                                      maxLength={input.defaultUnit ? 4 : 30}
                                          />
                                      }
                                      {input.defaultUnit && (
                                        <Dropdown options={getDropdownContent("units")} 
                                                  id={input.id} 
                                                  defaultUnit={context?.pickedTheme == null ? input.defaultUnit : 
                                                                checkForUnitChange(input.id) ? input.defaultUnit :
                                                                checkEdits(input.id, input.default, input.defaultUnit)[1]
                                                              }
                                        />)
                                      }

                                    </>
                                </fieldset>
                                )) 
                                : 
                                setting.alternatives ? 
                                <Dropdown options={getDropdownContent(setting.alternatives)} 
                                          id={setting.id} 
                                          onChange={(e) => context.updateTheme(e, setting.id, subSetting.selector, setting.cssProperty, setting.default)}
                                          initialLoad={true}
                                          defaultAlternative={
                                            context?.pickedTheme != null ?
                                            checkEdits(setting.id, setting.default, setting.defaultUnit)[0]
                                            : setting.default[0]
                                          }
                                          className={setting.alternatives == "boxShadow" || setting.alternatives == "fontFamily" ? "input-preview-text" : "dropdown-alternatives"}

                                />
                                :
                                <>
                                    <InputField id={setting.id} 
                                                onInput={() => {
                                                  if(context?.themeName.length > 1){
                                                    context?.setNoNewChanges(false)
                                                  }}
                                                }
                                                type={setting.type}
                                                onChange={subSetting.isPseudoElement ? 
                                                  (e) => context.updateTheme(e,  setting.id, subSetting.selector, setting.cssProperty, setting.default, subSetting.isPseudoElement, setting.variableForPseudo) 
                                                  :
                                                  (e) => context.updateTheme(e, setting.id, subSetting.selector, setting.cssProperty, setting.default)}
                                                defaultValue={
                                                  context?.pickedTheme != null ?
                                                  checkEdits(setting.id, setting.default, setting.defaultUnit)[0]
                                                  : setting.default
                                                }
                                                className={setting.defaultUnit ? "input-unit" : "input-normal"}

                                    />
                                      {setting.defaultUnit && (
                                        <Dropdown options={getDropdownContent("units")} 
                                                  id={setting.id} 
                                                  className={"dropdown-unit"}
                                                  defaultUnit={context?.pickedTheme == null ? setting.defaultUnit : 
                                                                checkForUnitChange(setting.id) == true ? setting.defaultUnit :
                                                                checkEdits(setting.id, setting.default, setting.defaultUnit)[1]
                                                              }
                                        />)
                                      }
                                </>
                              }
                          </fieldset>
                      ))   
                    }      
                  </section>
                ))}
                </div>

              </section>
            ))
      }  
    </form>
    <section className="editor-preview">
      {context?.themeType && (
        <div className="preview-content"
              dangerouslySetInnerHTML={{__html: context.themeType.previewHtml}}></div>
      )
      }
    </section>
  </>
 );
}