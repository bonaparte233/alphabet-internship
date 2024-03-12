import request from '@/libs/request'

export const queryAlbumsApi = (params) => request.get('/album', params)

export const queryAlbumApi = (pid) => request.get(`/album/${pid}`)