const multer  = require('multer');
const fs= require('fs');
const path = require('path');

exports.validation = async ( FileUploadOBject) => {

    
    // console.log(FileUploadOBject);
	// array of object for fields validation
	let field_validation_array={}
	let arrayfileds=[]
	// getting fileds
	let field_object=FileUploadOBject[0].fields
	for(let i of field_object){
		let file_object={name:i.name}
		// checkin saperate validation
		if(i.validations){
			file_object.max_size=i.validations.max_size || FileUploadOBject[0].validations.max_size
			file_object.allowed_types=i.validations.allowed_types || FileUploadOBject[0].validations.allowed_types
			file_object.allowed_extensions=i.validations.allowed_extensions || FileUploadOBject[0].validations.allowed_extensions
			file_object.validation_functions=i.validations.validation_functions || FileUploadOBject[0].validations.validation_functions
			file_object.global_validation_functions=i.validations.global_validation_functions || FileUploadOBject[0].validations.global_validation_functions
			file_object.file_count=i.validations.file_count || FileUploadOBject[0].validations.file_count
			file_object.upload_path=i.validations.upload_path || FileUploadOBject[0].validations.upload_path

			let dirlist_public=fs.readdirSync(path.join(__dirname,'../public/'))
			
			if(! dirlist_public.includes(file_object.upload_path)){
				
				fs.mkdirSync(path.join(__dirname,`../public/${file_object.upload_path}`))
			
			}
		}
		// file_object={max_size:i.validation.max_size ?? FileUploadOBject[0].validations.max_size}
		field_validation_array[i.name]=file_object
		arrayfileds.push({name:i.name,maxCount:file_object.file_count})

	
		
	}
	// console.log(arrayfileds)
	// console.log(field_validation_array)

	//multer middlware
	const filestorage = multer.diskStorage({
		destination: (req, file, cb) => {
			/* console.log(file)
			console.log(field_validation_array[file.fieldname].upload_path)
			 */req.filesubmission = true
				req.fileValidationValue = field_validation_array;
				  
			 cb(null, path.join(__dirname, `../public/${field_validation_array[file.fieldname].upload_path}/`))

		},
		filename: (req, file, cb) => {
			console.log("-------%%%--------")
			cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname)
		},
		limits: (req, file, cb) => {
			console.log("-------%%%--------")
			
			
			cb(null, field_validation_array[file.fieldname].max_size);
		}
	
	})
	
	
	const filefilter = (req, file, cb) => {
		// console.log(file)
	/* 	console.log(field_validation_array[file.fieldname].allowed_types)
	 	console.log(file.mimetype)
	*/	/* console.log(req) */

	var  FileSize = field_validation_array[file.fieldname].max_size;

		

	if (field_validation_array[file.fieldname].allowed_types.includes(file.mimetype)) {
			req.filesubmission = true
			cb(null, true)

		} else if(fileSize){

			console.log(fileSize);

		}else {
			cb(null, false)
		}

		


		console.log(typeof FileSize);

		
	}


	/* const filesize = () => {


		return {
			fileSize:  1024 * 1024 * FileSize
		};

	}  */

	let ip=multer({storage:filestorage,fileFilter:filefilter}) 

    // return upload.fields(FileArray);
	console.log("----------------------")

	return ip.fields(arrayfileds)
}