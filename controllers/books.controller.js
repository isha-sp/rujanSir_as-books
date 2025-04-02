const BookModel = require("../models/book.model");

exports.createBook = async(req,res) =>{
    try{
        const{title, author, reviews} = req.body;

        await BookModel.create({
            title,
            author,
            reviews
        })

        res.status(201).json({message: "Book created successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
};

exports.getBooks = async(req,res)=>{
    try{
        const{title, author, bookid} = req.query;
        const queryObject = {};
        if(title){
            queryObject["title"]= title
        }
        if(author){
            queryObject["author"]= author
        }
        if(bookid){
            queryObject["_id"]= bookid
        }
        console.log(queryObject)

        const books = await BookModel.find(queryObject);

        res.status(200).json({message: "Book fetched succesfully", data: books});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

exports.updateBook = async(req,res)=>{
    try{
        const id = req.params.bookid;
        const title = req.body.title;
        const author = req.body.author;
        const reviews = req.body.reviews;

        const updateFields= {};

        // const oldBook = await BookModel.findOne({_id: id});
        // const oldReviews = oldBook.reviews;

        // const updatedReviews = {...oldReviews, ...reviews};
        // console.log(update)

        for(let key in reviews){
            updateFields["reviews."+key.toString()] = reviews[key];
        }
        // console.log({...updateFields});
        const book = await BookModel.findOneAndUpdate({_id:id}, {
            $set: {
                "title": title,
                author,
                ...updateFields
            }
        }, {new:true})

        res.status(200).json({message: "book updated successfully", data: book})
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

exports.deleteBook = async(req,res)=>{
    try{
        const id = req.params.bookid;

        const deletedBook = await BookModel.findByIdAndDelete(id);

        if(!deletedBook){
            return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json({ message : "Book deleted succesfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getBookReviews = async(req,res)=>{
    try{
        const id = req.params.bookid;

        const book = await BookModel.findById(id).select("reviews");

        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json({message: "Reviews fetched successfully", data: book});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
};