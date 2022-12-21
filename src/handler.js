/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-undef */
const { nanoid } = require('nanoid')
const notes = require('./notes')

/* eslint-disable no-unused-vars */

// menambahkan note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload

  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }

  notes.push(newNote)

  const issukses = notes.filter((note) => note.id === id).length > 0

  if (issukses) {
    const response = h.response({
      status: 'sukses',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  })
  
  response.code(500)
  return response
}

// menampilkan semua note
const getAllNotesHandler = () => ({
  status: 'sukses',
  data: { 
    notes
  }
})

// menampilkan note secara spesifik
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params

  const note = notes.filter((n) => n.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'sukses',
      data: {
        note
      }
    }
  }
  
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

// merubah note
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()
  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }
    const response = h.response({
      status: 'sukses',
      message: ' Catatan berhasil diperbaharui'
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbaharui catatan. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

// fungsi untuk merubah note
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const index = notes.findIndex((note) => note.id === id)

  if (index !== -1) {
    notes.splice(index, 1)
    const response = h.response({
      status: 'sukses',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}


module.exports = { 
  addNoteHandler, 
  getAllNotesHandler, 
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler
}
