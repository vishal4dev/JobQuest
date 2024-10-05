import {Job} from '../models/job.model.js';


//admin will post the job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

//this is for students to see/get all the jobs
export const getAllJobs = async (req, res) => {
    try {

        //req.query.keyword: This extracts the keyword parameter from the query string of the request URL. For example, if the URL is /search?keyword=apple, req.query.keyword would be "apple".
        //|| "": This is a fallback to an empty string in case the keyword parameter is not provided. This prevents errors by ensuring that keyword is always a string, even if the query parameter is missing.

        const keyword = req.query.keyword || "";

        /*
        //This is a mongodb query

        $or: This is a MongoDB operator that performs a logical OR operation. It returns documents that satisfy at least one of the conditions in the array.
        This means that the query will return documents where either the title or the description field contains the keyword.

        $regex: keyword: This performs a regular expression (regex) search in MongoDB. The keyword is used to search within the specified field (either title or description).

        $options: "i": The "i" option makes the regex search case-insensitive. So, whether the keyword is in uppercase, lowercase, or a mix, it will match.

        For example, if keyword = "apple", it will match "Apple," "APPLE," or "aPpLe" in the title or description.
        */
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        /*
        Job.find(query): This is a Mongoose query to find documents in the Job collection that match the conditions specified in query

        populate({ path: "company" }):
        populate() is a Mongoose method that is used to populate or fetch related data from another collection.
        path: "company": This specifies the field that should be populated. Here, "company" is a reference field in the Job schema, which stores an ObjectId that references the Company collection.
        By using populate(), Mongoose will replace the company field in the job document with the actual company document (fetched from the Company collection) instead of just the ObjectId.
        
        eg.->
        {
            title: "Software Engineer",
            compnay:objectId("12345"),
    }

            
        the populate("company") will replace the company field with the actual company document:
        
        {
            title: "Software Engineer",
            company: {
                _id: objectId("12345"),
                name: "Company Name",
                ...
            }
        
        }
        sort({ createdAt: -1 }): This sorts the results in descending order based on the createdAt field. This means that the most recent jobs will appear first in the results.

        */
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });


        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//find jovs using id for students
export const getJobById = async (req, res) => {
     try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };

        return res.status(200).json({
            job,
            success: true
        })

     } catch (error) {
        console.log(error);
     }

}

//this is for the admin to see all the jobs
export const getAdminJobs = async (req,res)=>{
    try {
       
        //adminId is extracted from the request object, which contains the ID of the authenticated admin user.
        const adminId = req.id;

        //Find all jobs created by the admin user
        const jobs = await Job.find({created_by:adminId});

        if(!jobs){
            return res.status(404).json({
                message:"No jobs found",
                success:false
            });
        }

        return res.status(200).json({
            jobs,
            success:true
        });


    } catch (error) {
        console.log(error);
    }
}
