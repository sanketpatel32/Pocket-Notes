import { createContext,useEffect,useState } from "react";
const NotesContext = createContext();
const NOTES_KEY = "Notes";
function NotesProvider({ children }) {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem(NOTES_KEY)) || []
  );
  // Selected options
  const [selected, setSelected] = useState("");
  // For Mobile Display
  const [isMobile, setIsMobile] = useState(false);
  // Complementry function for Mobile display
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    // This function updates the state variable `isMobile` based on the window's inner width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
  
    // We add an event listener to the window object for the 'resize' event and call `handleResize` whenever the event occurs.
    window.addEventListener("resize", handleResize);
    
    // Call `handleResize` once when the component mounts to set the initial value of `isMobile`
    handleResize();
  
    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (notes.length > 0)
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selected,
        setSelected,
        isMobile,
        display,
        setDisplay,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
export default NotesProvider;
export { NotesContext, NOTES_KEY };
