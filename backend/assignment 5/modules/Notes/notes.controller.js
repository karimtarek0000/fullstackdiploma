import { notesModel } from "../../DB/models/notes.model.js";
import { usersNotesModel } from "../../DB/models/notesUsersModel.js";
import { usersModel } from "../../DB/models/users.model.js";

export const checkOwner = async (req, res, next) => {
  try {
    const { userId, noteId } = req.body;

    const result = await usersNotesModel.findOne({
      where: {
        userId,
        noteId,
      },
    });

    if (result) return next();
    res.statusCode = 400;
    res.json({ message: "User id or note id not correct" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

export const addNote = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const data = await notesModel.create({ title, content, userId });
    await usersNotesModel.create({ noteId: data.id, userId });

    res.statusCode = 201;
    res.json({ message: "Note created successfully" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Foreign key not correct" });
  }
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.body;

  try {
    const data = await notesModel.destroy({
      where: {
        id: noteId,
      },
      force: true,
    });

    if (data) {
      res.statusCode = 200;
      res.json({ message: "Note deleted successfully" });
      return;
    }

    res.statusCode = 200;
    res.json({ message: "User id or note id not correct" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

export const updateNote = async (req, res) => {
  const { noteId, data } = req.body;

  try {
    await notesModel.update(data, {
      where: {
        id: noteId,
      },
    });

    res.statusCode = 200;
    res.json({ message: "Note updated successfully" });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};

export const getAllNotes = async (_, res) => {
  try {
    const notes = await notesModel.findAndCountAll({
      include: {
        model: usersModel,
      },
    });

    res.statusCode = 200;
    res.json({ message: "All notes", data: notes });
  } catch (error) {
    res.statusCode = 400;
    res.json({ message: "Error" });
  }
};
