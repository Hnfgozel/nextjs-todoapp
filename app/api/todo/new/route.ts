import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";


const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
const access_key = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!;
const secret_access_key = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!;
const region = process.env.NEXT_PUBLIC_AWS_S3_REGION!;


async function uploadToS3(key: string, data: Buffer) {
    console.log("key", key);
    console.log("data", data);

    const s3Client = new S3Client({
        region: region,
        credentials: {
            accessKeyId: access_key,
            secretAccessKey: secret_access_key,
        },
    });

    const params = {
        Bucket: bucket,
        Key: key,
        Body: data,
        ContentType: 'application/octet-stream', // Set appropriate content type
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log("File uploaded successfully.");

        // Construct the URL of the uploaded file
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        console.log("Uploaded file URL:", url);

        return { url }; // Return the URL
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
}



export const POST = async (request: Request) => {
    try {
        // Destructure the request body
        const { userId, description, tag, imageUrl, fileUrl } = await request.json();
        console.log(fileUrl)
        // Connect to the database
        await connectToDB();

        // Upload image to S3 if imageUrl is provided
        let imageUploadResult = null;
        if (imageUrl) {
            const imageKey = `images/${Date.now()}-${userId}.jpeg`;
            const imageData = Buffer.from(imageUrl.split(",")[1], "base64");
            imageUploadResult = await uploadToS3(imageKey, imageData);
        }

        // Upload file to S3 if fileUrl is provided
        let fileUploadResult = null;
        if (fileUrl) {
            const fileKey = `files/${Date.now()}-${userId}.pdf`;
            const fileData = Buffer.from(fileUrl.split(",")[1], "base64");
            fileUploadResult = await uploadToS3(fileKey, fileData);
        }
        console.log("fileUploadResult", fileUploadResult)
        // Create a new todo object
        const newTodo = new Todo({
            creator: userId,
            description,
            tag,
            imageUrl: imageUploadResult?.url,
            // fileUrl: fileUploadResult.url,
        });

        // Save the new todo
        await newTodo.save();

        // Return the new todo as a response
        return new Response(JSON.stringify(newTodo), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new todo", { status: 500 });
    }
};

