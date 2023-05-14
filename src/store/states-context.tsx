import { createContext, useState, useRef} from "react";
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import axios from "axios";
import { Istyle } from "../types/globalTypes";
import { v4 as uuid } from 'uuid';


type StatesContextType = {
  location: string
  navigate: NavigateFunction
  
  fetchData(url: string):void
  saveTheme(): JSX.Element | void
  showComponent(string:string):boolean
  checkThemeType: (href: string) => void
  pickTheme: (e:React.MouseEvent<HTMLTableRowElement, MouseEvent>, theme: newThemeType) => void
  removeTheme:(theme: newThemeType) => void
  navBack: () => void
  createModal: (status: string) => void
  startEditor: (string?: string) => void

  // markedTheme: HTMLTableRowElement | null
  // setMarkedTheme: React.Dispatch<React.SetStateAction<null>>

  typeId: string
  setTypeId: React.Dispatch<React.SetStateAction<string>>

  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>



  themeType: fetchedTypes["types"] | null
  setThemeType: React.Dispatch<React.SetStateAction<fetchedTypes["types"] | null>>

  themes: fetchedThemes["themes"] | null
  setThemes: React.Dispatch<React.SetStateAction<fetchedThemes["themes"] | null >>

  pickedTheme: newThemeType | null
  setPickedTheme: React.Dispatch<React.SetStateAction<newThemeType | null>>

  newTheme: newThemeType | null
  setNewTheme: React.Dispatch<React.SetStateAction<newThemeType | null>>

  noNewChanges: boolean
  setNoNewChanges: React.Dispatch<React.SetStateAction<boolean>>

  themeName: string
  setThemeName: React.Dispatch<React.SetStateAction<string>>

  inputRefs: never[]
  setInputRefs: React.Dispatch<React.SetStateAction<never[]>>

  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>

  showOverlay: boolean
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>



  modalHeading: string
  setModalHeading: React.Dispatch<React.SetStateAction<string>>

  modalInfo: string
  setModalInfo: React.Dispatch<React.SetStateAction<string>>

  modalButtons: modalButtonsType["buttons"]
  setModalButtons: React.Dispatch<React.SetStateAction<modalButtonsType["buttons"]>>



  setStyle: ({}:Istyle) => {}
  createNewTheme: () => void
  saveTheme: () => JSX.Element | void
  updateStyle: (value: string, selector: string, cssProperty: string) => void
  updateTheme: (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id:string, selector:string, cssProperty:string, defaultSetting:string[], isPseudoElement?: string, variableForPseudo?: string) => void

  initialLoad: (element: HTMLInputElement | HTMLSelectElement | null) => void
}


const setStyle = ({width, maxWidth, height, fontSize, padding, 
                  borderRadius, backgroundColor, color, borderBottom, border}: Istyle) => {
  return {
    width: width,
    maxWidth: maxWidth,
    height: height,
    fontSize: fontSize,
    padding: padding,
    backgroundColor: backgroundColor,
    color: color,
    borderRadius: borderRadius,
    borderBottom: borderBottom,
    border: border
  }
}

type StatesContextProviderProps = {
   children: React.ReactNode
}
export type newThemeType = {
  id: string
  name: string
  typeId: string
  created: string
  attributes: {
    id: string
    values: string[]
  }[]
 }

type fetchedTypes = {
  types: {
    id: string
    name: string
    previewHtml: string
    selectors: {
        id: string
        mainHeading: string
        selector: string
        subOptions: {
            id: string
            subHeading: string            
            selector: string
            isPseudoElement?: string
            toggleVisibility?: boolean
            previewText?: string
            attributes:{
              id: string
              name: string
              type: string
              multipleInputs?: {
                    id: string
                    type: string
                    defaultUnit?: string
                    alternatives?: string
                    boxModelOption: string
                    variableForPseudo?: string
                    cssProperty: string
                    default: string[]
                  }[]
              defaultUnit?: string
              alternatives?: string
              cssProperty: string
              variableForPseudo?: string
              default: string[]
            }[]     
        }[] 
    }[]
  }
}
export type fetchedThemes = {
  themes: {
    id: string
    name: string
    typeId: string
    created: string
    attributes:{
       id: string
       values: string[]
    }[]
  }[]
}
type modalButtonsType = {
    buttons:{
      name: string
      func: () => void
      className: string
    }[]
}



const StatesContext = createContext<StatesContextType | null>(null);


export const StatesContextProvider = ({children}: StatesContextProviderProps) => {

  const navigate = useNavigate();
  let location = useLocation().pathname;

  const [themeType, setThemeType] = useState<fetchedTypes["types"] | null>(null);
  const [newTheme, setNewTheme] = useState<newThemeType | null>(null);
  const [noNewChanges, setNoNewChanges] = useState<boolean>(true);
  const [themeName, setThemeName] = useState<string>("");
  const [inputRefs, setInputRefs] = useState([])
  const [themes, setThemes] = useState<fetchedThemes["themes"] | null>(null);
  const [pickedTheme, setPickedTheme] = useState<newThemeType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [typeId, setTypeId] = useState<string>("")
  const [modalHeading, setModalHeading] = useState<string>("")
  const [modalInfo, setModalInfo] = useState<string>("")
  const [modalButtons, setModalButtons] = useState<modalButtonsType["buttons"]>([])
  // const [markedTheme, setMarkedTheme] = useState<HTMLTableRowElement | null>(null);



const fetchData = (url: string) => {
    setLoading(true);
    if(url.includes("types")){
      axios.get(url)
        .then((response) => setThemeType(response.data[0]))
        .catch((err) => console.log(err))
        .then(() => setLoading(false))
    }
    else if(url.includes("themes")){
      setLoading(true);
      axios.get(url)
        .then((response) => setThemes(response.data))
        .catch((err) => console.log(err))
        .then(() => setLoading(false))
    }
}
  

const pickTheme = (e:React.MouseEvent<HTMLTableRowElement, MouseEvent>, theme:newThemeType) => {

    setPickedTheme(theme)

        // let ar:HTMLElement[] = [];
        // const themeToMark = e.currentTarget;

        // if(ar.length == 1){
        //   ar.map((the) => {
        //     the.style.backgroundColor = "blue";
        //   })
        //   ar.pop();
        //   ar.push(themeToMark)
        // }
        
        // if(ar.length == 0){
        //   ar.push(themeToMark);
        // }
}

const showComponent = (word:string):boolean => {
    if(location.includes("createnewtheme") && word == "save"){
      return true
    }
    if(location.includes("createnewtheme") && word == "name"){
      return true
    }
    if(location.includes("edittheme") && word == "name"){
      return true
    }
    if(location.includes("edittheme") && word == "save"){
      return true
    }
    if(location.includes("picktheme") && word == "load"){
      return true
    }
    if(location != "/" && word == "back"){
      return true
    }
    else{
      return false
    }
}

  //FÖRKLARING-------------------------------------------------
  //Funktionen sparar temat om det inte finns ett valt tema att editera
  //Här används uuid för att generera ett nytt id till nyskapade teman
  //Typeid till det nya temat anger att det är ett tema för forms
const saveTheme = (quitAfterSave?: string) => {

    if(location.includes("edittheme")){
       axios.put(`http://localhost:8000/themes/${newTheme?.id}`,{
        ...newTheme,
        name: themeName
       })
       console.log("updating theme")
       setNoNewChanges(true);
       setShowModal(true);
       setShowOverlay(true);

       quitAfterSave ? createModal("themeupdated", quitAfterSave) :
       createModal("themeupdated")
    }
    else{
      axios.post("http://localhost:8000/themes", 
      { ...newTheme, 
        name: themeName, 
        typeId: themeType?.id
      })
      .then(res => console.log(res.data))
      setNoNewChanges(true);
      setShowModal(true);
      setShowOverlay(true);

      quitAfterSave ? createModal("themesaved", quitAfterSave) :
      createModal("themesaved")
    }

    if(showModal == true){
      setShowOverlay(false)
      setShowModal(false)
    }
}

const checkThemeType = (href:string) => {
    if(href.includes("/sweetforms")){
      setTypeId("8e8a2d57-f8d6-4cfb-be6d-aa0a45fcfc83")
    }
}

const createNewTheme = () => {
    const uniqueId = uuid();
    let createdDate = new Date().toLocaleString();

    let endIndex = createdDate.indexOf(",")
    let formattedDate = createdDate.slice(0, endIndex).replaceAll("/", "-");

    const newTheme = {
        id: uniqueId,
        name: "",
        typeId: "",
        created: formattedDate,
        attributes: []
    }
    setNewTheme(newTheme);
}

const updateStyle = (value:string, selector:string, cssProperty:string, isPseudoElement?:string, variableForPseudo?: string) => {

    if(isPseudoElement && variableForPseudo){

      let elements = document.querySelectorAll<Element>(selector.replace(isPseudoElement, "")) as NodeListOf<Element>;
      let arrayOfElements = Array.from(elements) as Array<HTMLElement>

      arrayOfElements.map((element) => {       
          element.style.setProperty(variableForPseudo, value)       
      })   
    }

    else{
      const currentFormElements = document.querySelectorAll<Element>(selector) as NodeListOf<Element>;
      const startIndex = cssProperty.indexOf(":");
      let slicedCssProp = cssProperty.slice(0, startIndex);

      const arrayOfElements = Array.from(currentFormElements) as Array<HTMLElement>
      arrayOfElements.map((element) => {
          element.style.setProperty(slicedCssProp, value);
      })
    }
    
}

const updateTheme = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id:string, selector:string, cssProperty:string, defaultSetting:string[], isPseudoElement?: string, variableForPseudo?: string) => {

  let valueToBeInserted: string;

  if(e.target.nextElementSibling){

      let dropdown = e.target.nextElementSibling as HTMLSelectElement;
      let dropdownValue = dropdown.options[dropdown.selectedIndex].value;
      valueToBeInserted = e.target.value+dropdownValue;
  }
  
  else{
      valueToBeInserted = e.target.value;
  }

 updateStyle(valueToBeInserted, selector, cssProperty, isPseudoElement, variableForPseudo)

 let currentSetting = {
   id,
   selector: selector,
   cssProperty: cssProperty,
   values: [valueToBeInserted]
 }

   if(newTheme?.attributes.length == 0){
        newTheme?.attributes.push(currentSetting)
   }
   else{
        if(defaultSetting[0] != valueToBeInserted){
          if(!newTheme?.attributes.find((attribute) => attribute.id == id)){
            newTheme?.attributes.push(currentSetting)
          }
          else{
            newTheme?.attributes.map((attribute) => {
              if(attribute.id == id){
              attribute.values = [valueToBeInserted]
              }        
          })
          }
        }
   }
   console.log("NEW THEME IS:", newTheme)
}

const removeTheme = (theme: newThemeType) => {
   axios.delete(`http://localhost:8000/themes/${theme.id}`);
   createModal("themewasremoved")
}

const navBack = () => {
  if(!noNewChanges && location.includes("themeeditor")){
    createModal("unsavedChanges")
    setShowOverlay(true);
    setShowModal(true);
  }
  else if(location.includes("edittheme")){
    navigate("sweetforms/themeactions")
  }
  else if(location.includes("/sweetforms/themeactions")){
    navigate("/")
  }
  else if(location.includes("/picktheme")){
    setPickedTheme(null);
    navigate("/sweetforms/themeactions")
  }
  else{
    navigate(-1)
  }
 }

 const createModal = (status: string, quitAfterSave?: string) => {
    switch(status){

      case "unsavedChanges":
          setModalHeading("You have unsaved changes")
          setModalInfo("Do you want to save before quitting?")
          setModalButtons([
                   {name: "Yes", 
                    func: () => {saveTheme("quitAfterSave")},
                    className: "primary-button"
                   }, 
                   {name: "no", 
                    func: () => {
                      navigate(-1)
                      setShowOverlay(false)
                      setShowModal(false)
                    },
                    className: "secondary-button"
                   }, 
                   {name: "Cancel", 
                    func: () => {
                    setShowOverlay(false)
                    setShowModal(false)   
                    },
                    className: "border-button"
                  }
                  ])
                  break;

        case "remove": 
            setModalHeading("Do you want to remove this theme?")
            setModalInfo("Once you removed it it will be gone")
            setModalButtons([
                   {name: "Yes", 
                    func: () => {
                      if(pickedTheme != null)
                        removeTheme(pickedTheme)
                     },
                     className: "primary-button"
                    },
                   {name: "No", 
                    func: () => {
                      setShowOverlay(false);
                      setShowModal(false);
                    },
                    className: "secondary-button"
                  }
                 ])
                 break;
        case "themewasremoved":
            setModalHeading("Theme removed")
            setModalInfo("")
            setModalButtons([
                  {
                    name: "Ok", 
                    func: () => {
                      setShowOverlay(false);
                      setShowModal(false);
                      setPickedTheme(null);
                      fetchData("http://localhost:8000/themes");              
                    },
                    className: "primary-button"
                  }
                  ])
                  break;
        case "themeupdated":
          setModalHeading("The theme was updated!")
          setModalInfo("")
          setModalButtons([
                { 
                  name: "Ok", 
                  func: () => {
                    setShowOverlay(false);
                    setShowModal(false); 
                    if(quitAfterSave){
                      navigate("/sweetforms/themeactions")
                    }          
                  },
                  className: "primary-button"
                }
                ])
                break;
        case "themesaved":
          setModalHeading("Theme Saved!")
          setModalInfo("Your theme is saved and can be found in sweetforms")
          setModalButtons([
                {
                  name: "Ok", 
                  func: () => {
                    setShowOverlay(false);
                    setShowModal(false);    
                    quitAfterSave ? navigate("/sweetforms/themeactions") : navigate("/themeeditor/edittheme"); 
                    startEditor("edit");     
                  },
                  className: "primary-button"
                }
                ])
                break;            
    }
 }

 const startEditor = (string?: string) => {
  if(themeType == null){
        fetchData(`http://localhost:8000/types/${typeId}`)
  }
  else{
      if(string == "edit"){
        axios.get(`http://localhost:8000/themes/${newTheme?.id}`)
        .then((response) => setNewTheme(response.data))
        .then(() => console.log("new theme is now:", newTheme))
      }
      else if(string != "edit" && pickedTheme != null){
        setNewTheme(pickedTheme);
      }
      else{
        createNewTheme();
      }
  }
  setNoNewChanges(true);
  console.log("EDITOR STARTS")
}

  //FÖRKLARING--------------------------------------------------
  //Funktionen får in varje element genom ref hooken i input elementet för att uppdatera dess värde
  //Ändringarna från det sparade temat ska nu bli värdet av inputfälten om det gjorts ändringar
  //Här tittar vi på värdet i elementets data-set, den anger om den initiala laddningen gjorts
  //Värdena från det sparade temat tillsätts under focus eventet av input-fältet
  //Efter att värdet tillsatts bluras elementet igen
  const initialLoad = (element: HTMLInputElement | HTMLSelectElement | null) => {
    if(element != null && element.getAttribute("data-initial-load") == "false"){
      element?.focus();
      element?.blur();
      element.setAttribute("data-initial-load", "true");
      
    }
  }


  //FÖRKLARING----------------------------------------------------
  //Här exporterar jag ut funktionerna och variablerna från mitt context
  //för användning i andra komponenter
  return(
    <StatesContext.Provider value={{
      // markedTheme, setMarkedTheme,
      initialLoad,
      modalHeading, setModalHeading,
      modalInfo, setModalInfo,
      modalButtons, setModalButtons,
      startEditor,
      createModal,
      typeId, setTypeId,
      loading, setLoading,
      location, navigate,
      checkThemeType,
      themeType, setThemeType,
      themes, setThemes,
      pickedTheme, setPickedTheme,
      removeTheme, navBack,
      fetchData, saveTheme,
      showComponent, pickTheme,
      newTheme, setNewTheme,
      noNewChanges, setNoNewChanges,
      themeName, setThemeName,
      setStyle,
      createNewTheme,
      inputRefs, setInputRefs,
      updateStyle, updateTheme,
      setShowModal, showModal,
      showOverlay, setShowOverlay
      }}>
      {children}
    </StatesContext.Provider>
  )
}

export default StatesContext;