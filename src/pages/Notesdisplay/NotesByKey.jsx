import React from 'react'
import styles from './NotesByKey.module.css'
import SideBarOptions from '../../components/SideBarOptions';
import Content from '../../components/Content';
import Notes from './Notes';
import useNotes from '../../Hooks/useNotes';
import { useState, useEffect } from 'react';
import backBtn from '../../assets/backBtn.svg'
const NotesByKey = () => {
  const { selected, notes, isMobile, setDisplay } = useNotes();
  const newNote = notes.filter((note) => note.id === selected);
  const [notesData, setNotesData] = useState(
    JSON.parse(localStorage.getItem(selected)) || []
  );

  const handelClick = () => {
    if (isMobile) {
      setDisplay(false);
    }
  };


  useEffect(() => {
    setNotesData(JSON.parse(localStorage.getItem(selected)) || []);
  }, [selected]);
  useEffect(() => {
    console.log("hello");
  }, [notesData]);
  return (
    <div className={styles.container}>
      <div className={styles.header}
        style={{ backgroundColor: `${newNote[0].color}`, color: 'white' }}>
        {isMobile && (
          <button  className={styles.btn} onClick={() => handelClick()}>
            <img src={backBtn} alt="arrow icon" />
          </button>
        )}
        <SideBarOptions item={newNote[0]} />
      </div>


      <div className={styles.content}>
        {notesData.length > 0 ? (
          notesData.map((note, idx) => <Content note={note} key={idx} />)
        ) : (
          <p className={styles.placeholder}>Welcome To Pocket notes.... <br/> You can start adding you private Notes </p>
        )}
      </div>
      <div className={styles.Notes}>
        <Notes setNotesData={setNotesData} />
      </div>


    </div>
  )
}

export default NotesByKey