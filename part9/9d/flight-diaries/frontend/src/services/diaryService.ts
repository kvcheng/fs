import axios from "axios";
import type { Diary, NewDiaryEntry } from "../types/types";

const baseUrl = "/api/diaries";

export const getAllDiaries = async () => {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
};

export const createDiary = async (newDiary: NewDiaryEntry) => {
    try {
        const response = await axios.post<Diary>(baseUrl, newDiary);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response)
            throw new Error(error.response?.data || 'Something went wrong');
        } else {
            console.error(error);
        }
    }
}
