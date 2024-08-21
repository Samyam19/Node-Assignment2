const fs = require("fs");
const path = require("path");
const notesPath = path.join(__dirname, "../../data/notes.json");
let notes = require(notesPath);
const errorHandler = require('../middleware/errorHandler');

const notesDB = () => {
    fs.writeFileSync(notesPath, JSON.stringify(db, null, 2));
  };
  
  const getAllNotes = (req, res) => {
    res.status(200).json(notes.notes);
  };
  
  const getNotesById = (req, res) => {
    const notes = notesDB.notes.find((n) => n.id == req.params.id);
    if (notes) {
      res.status(200).json(notes);
    } else {
      res.status(404).json({ message: "Notes not found" });
    }
  };
  
  const createNotes = [
    errorHandler,
    (req, res) => {
      const newNote = req.body;
      newNote.id = notes.notes.length + 1;
      notes.notes.push(newNote);
      notesDB();
      res.status(201).json(newNote);
    }
  ];
  
  const updateNotes = (req, res) => {
    const index = db.notes.findIndex((n) => n.id == req.params.id);
    if (index !== -1) {
      db.notes[index] = req.body;
      db.notes[index].id = req.params.id;
      notesDB();
      res.status(200).json(db.notes[index]);
    } else {
      res.status(404).json({ message: "Notes not found" });
    }
  };
  
  const deleteNotes = (req, res) => {
    const id = parseInt(req.params.id);
    const noteExists = notes.notes.some(note => note.id === id);
    if (!noteExists) {
      return res.status(404).json({ error: 'Note not found' });
    }
    notes.notes = notes.notes.filter((note) => note.id !== id);
    notesDB();
    res.status(200).json({ message: 'Note deleted successfully' });
  };
  

  module.exports = {
    getAllNotes,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes,
  };