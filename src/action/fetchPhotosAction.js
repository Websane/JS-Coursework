import {FETCH_PHOTOS} from "./types";
import api from "../api";


export function fetchPhotos(page, perPage) {
    //получаем response, ожидая пока нативный метод fetch сделает запрос по нужному адресу (в данном случае получит фото через функцию описанную в api.js)
    return async dispatch => {
        const response = await api.getPhotos(page, perPage)
        console.log(response)
        //закидываем полученное значение в редюсер, меняя состояние стора
        dispatch({type: FETCH_PHOTOS, payload: response})
    }
}



