import userService from './userService';

const BASE_URL = '/api/puppies';

export function getAll() {
  return fetch(`${BASE_URL}/user/${userService.getUser()._id}`)
  .then(res => res.json());
}

export function create(pup) {
    pup.user = userService.getUser()._id;
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(pup)
    }).then(res => res.json());
}

export function deleteOne(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    }).then(res => res.json());
}

export function update(pup) {
    pup.user = userService.getUser()._id;
    return fetch(`${BASE_URL}/${pup._id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(pup)
    }).then(res => res.json());
}