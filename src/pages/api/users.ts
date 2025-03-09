import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const { email, password } = req.query;
                const response = await axios.get("http://localhost:5000/users", {
                    params: { email, password },
                });
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: "Failed to fetch users" });
            }
            break;
        case "POST":
            try {
                const response = await axios.post("http://localhost:5000/users", req.body);
                res.status(201).json(response.data);
            } catch (error) {
                res.status(500).json({ error: "Failed to create user" }):
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}