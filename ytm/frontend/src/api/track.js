import request from "@/libs/request";

export const queryMusicsApi = (params) => request.get('/track', params)