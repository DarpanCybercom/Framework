const chalk = require('colors/safe');
const multer  = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
      
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const maxSize = 1 * 1024 * 1024; // for 1MB
   
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
    limits: { fileSize: maxSize },
  }).single('File');

exports.filevalidation = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          res.send(err)
        } else if (err) {
          // An unknown error occurred when uploading.
          res.send(err)
        }
        console.log(req.file)
        // Everything went fine.
      })


      console.log(req.body);      

   /*  if(req.files){
        if(req.files.file){
            if(req.files.file.mimetype == "image/jpeg" || req.files.file.mimetype == "image/png" || req.files.file.mimetype == "image/gif"){
                next();
            }else{
                res.json({status : "error", message : "file type is not valid"});
            }
        }else{
            res.json({status : "error", message : "file is not valid"});
        }
    }else{
        res.json({status : "error", message : "file is not valid"});
    } */
    

}

/* 







const filename="savefileisdone";
const file_filter_object={"file":"[\"image/jpg\",\"image/jpeg\"]"};
const arrayfileds=[{"name":"file","maxCount":"1"}];

 
const filestorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    req.filesubmission=true
    cb(null,path.join(__dirname,`../../../public/${filename}`))
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname)
  }
})


const filefilter=(req,file,cb)=>{
if(file_filter_object[file.fieldname].includes(file.mimetype)){
  req.filesubmission=true
  cb(null,true)
}else{
  cb(null,false)
}
}

let ip=multer({storage:filestorage,fileFilter:filefilter})


exports.filevalidation=ip.fields(arrayfileds) */