import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const response = await axios.get("http://localhost:5000/posts");
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch posts" });
            }
            break;
        case "POST":
            try {
                const response = await axios.post("http://localhost:5000/posts", req.body);
                res.status(201).json(response.data);
            } catch (error) {
                res.status(500).json({ error: "Failed to create post" });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}