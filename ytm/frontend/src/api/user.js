import request from '@/libs/request'

export const loginApi = (data) => request.post('/user/login', data)

export const registerApi = (data) => request.post(`/user/register`, data)

export const getInfoApi = (uid) => request.get(`/user/${uid}`, { _item: 'playing' })

export const reportInfoApi = (uid, playing) => request.post(`/user/${uid}`, {playing: playing})