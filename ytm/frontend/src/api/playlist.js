import request from "@/libs/request";

export const queryPlayListsApi = (params) => request.get('/playlist', params)

export const queryPlayListApi = (pid) => request.get(`/playlist/${pid}`)

export const savePlayListApi = (data) => request.post('/playlist', data)

export const deletePlayListApi = (pid) => request.delete(`/playlist/${pid}`)