import request from "@/libs/request";

export const queryPlayListsApi = (params) => request.get('/playlist', params)

export const queryPlayListApi = (pid) => request.get(`/playlist/${pid}`)