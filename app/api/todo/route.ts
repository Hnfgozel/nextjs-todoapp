import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
    try {
        await connectToDB()

        const todos = await Todo.find({}).populate('creator')

        return new Response(JSON.stringify(todos), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Todos", { status: 500 })
    }
} 