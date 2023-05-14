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
  console.log("LOADING IS:", context?.loading)
  const checkForUnitChange = (settingId: string):boolean => {
    if(!context?.pickedTheme?.attributes.find((attribute) => attribute.id == settingId)){
      return true
    }
    else{
      return false
    }
}
  
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

  const setPreviewText = (e: React.ChangeEvent<HTMLInputElement>, selector: string) => {
       const element = document.querySelector(selector);
       if(element){
        element.textContent = e.target.value;
       }
       
  }

  const toggleVisibility = (selector: string) => {
     const element = document.querySelector(selector);
     element?.classList.toggle("hide");
  }

  const setInitialClass = (selector: string) => {
    const element = document.querySelector(selector);

    if(element != null && !element.getAttribute("data-initial-load")){
      element?.classList.add("hide");
      element?.setAttribute("data-initial-load", "true");
    }
  }

 const minimizeSections = () => {
  const subSections = document.querySelectorAll<Element>(".editor-sub-sections") as NodeListOf<Element>;
     const subSectionsArray = Array.from(subSections);

     subSectionsArray.map((subsection) => {
          subsection.classList.add("hide");     
     })
 }

  useEffect(() => {
   context?.startEditor();
   minimizeSections();
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
        case "display": content = ["","inline-flex"]
          break;
        case "alignItems": content = ["","center"]
          break;
        case "textAlign": content = ["initial","left", "center", "right"]
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
                                          className="dropdown-alternatives"

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