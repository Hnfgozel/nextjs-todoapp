import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!;
const access_key = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!;
const secret_access_key = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!;
const region = process.env.NEXT_PUBLIC_AWS_S3_REGION!;


async function uploadToS3(key: string, data: Buffer) {
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
        ContentType: 'application/octet-stream',
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        return url;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
}

export const GET = async (request: Request, { params }) => {
    try {
        await connectToDB()

        const todo = await Todo.findById(params.id).populate("creator")
        if (!todo) return new Response("Todo Not Found", { status: 404 });

        return new Response(JSON.stringify(todo), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request: Request, { params }) => {
    const { description, tag, imageUrl } = await request.json();

    try {
        await connectToDB();

        const existingTodo = await Todo.findById(params.id);
        if (!existingTodo) {
            return new Response("Todo not found", { status: 404 });
        }

        // If imageUrl is provided, upload the new image to S3 and update the URL
        let updatedImageUrl = existingTodo.imageUrl;
        if (imageUrl) {
            const imageKey = `images/${Date.now()}-${existingTodo.creator.toString()}.jpeg`;
            const imageData = Buffer.from(imageUrl.split(",")[1], "base64");
            updatedImageUrl = await uploadToS3(imageKey, imageData);
        }

        // Update the todo with new data
        existingTodo.description = description || existingTodo.description;
        existingTodo.tag = tag || existingTodo.tag;
        existingTodo.imageUrl = updatedImageUrl;

        await existingTodo.save();

        return new Response("Successfully updated the Todo", { status: 200 });
    } catch (error) {
        return new Response("Error updating Todo", { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }) => {
    try {
        await connectToDB();

        // Find the Todo by ID and remove it
        await Todo.findByIdAndDelete(params.id);

        return new Response("Todo deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting todo", { status: 500 });
    }
};
