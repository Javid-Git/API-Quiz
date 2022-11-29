import axios from "axios";

export const BASE_URL = 'https://localhost:44342/';

export const ENDPOINTS = {
    participant: 'Participant',
    question:'question',
    option : 'option',
    questions: 'question'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/manage/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}