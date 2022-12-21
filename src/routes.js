const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
} = require('./handler')
/* eslint-disable eol-last */
const routes = [
  { // fungsi untuk menambahkan note
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
  },
  { // fungsi untuk menampilkan note
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  { // fungsi untuk menampilkan secara spesifik
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler
  },
  { // fungsi untuk merubah note
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler
  },
  { // fungsi untuk menghapus note
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler
  }
]

module.exports = routes