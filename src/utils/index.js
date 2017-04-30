import { updateExamList } from '../actions';

export function retrieveExamList(store) {
  fetch(`/getExams`).then(
    (response) => response.json()
  ).then(
    (json) => store.dispatch(updateExamList(json))
  )
}
