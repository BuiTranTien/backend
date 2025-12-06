const Book = require("./book.module");

const postABook = async (req, res) => {
  try {
    const newBook = await new Book({ ...req.body })
    await newBook.save();
    res.status(200).send({ message: "Book posted", book: newBook })
  } catch (error) {
    console.log("error creating books", error);
    res.status(500).send({ message: "fail to post a book" })
  }
}

//get all book
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.status(200).send(books)
  } catch (error) {
    console.log("error fetching books", error);
    res.status(500).send({ message: "fail to fetch a book" })
  }
}

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    if (!book) {
      res.status(404).send({ message: "Book not Found" })
    }
    res.status(200).send(book)
  } catch (error) {
    console.log("error fetching books", error);
    res.status(500).send({ message: "fail to fetch a book" })
  }
}

const updateBook = async (req,res) =>{
  try {
    const {id} = req.params
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedBook){
      res.status(404).send({ message: "Book not Found" })
    }
    res.status(200).send({
      message:"book updated success",
      book: updatedBook
    })
  } catch (error) {
    console.log("error updating books", error);
    res.status(500).send({ message: "fail to edit a book" })
  }
}

const deleteABook = async (req,res) =>{
  try {
    const {id} = req.params
    const deletedBook =  await Book.findByIdAndDelete(id)

    if(!deleteABook){
      res.status(404).send({ message: "Book not Found" })
    }
    res.status(200).send({
      message:"book deleted success",
      book: deletedBook
    })
  } catch (error) {
    console.log("error deleting books", error);
    res.status(500).send({ message: "fail to delete a book" })
  }
}

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteABook
}