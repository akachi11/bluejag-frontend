import { customAlphabet } from "nanoid";

const nanoid = customAlphabet('123456789', 7);

export const generateId = (length) => {
    nanoid(length)
}
