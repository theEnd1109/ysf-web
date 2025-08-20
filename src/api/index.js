import request from "@/utils/request";

export function test(params) {
    return request.get('/index/test', params)
}
