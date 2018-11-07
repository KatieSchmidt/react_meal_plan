import axios from "axios";
import {
  GET_WEEKPLANS,
  GET_WEEKPLAN_BY_ID,
  ADD_MEALPLAN_TO_WEEKPLAN,
  GET_WEEKPLANS_BY_USER
} from "./types";

//get weekplans
export const getWeekplans = () => dispatch => {
  axios
    .get("/api/week-plan")
    .then(res =>
      dispatch({
        type: GET_WEEKPLANS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKPLANS,
        payload: err.data
      })
    );
};

//get weekplans by user
export const getWeekplansByUser = user_id => dispatch => {
  axios
    .get(`/api/week-plan/userweekplans/${user_id}`)
    .then(res =>
      dispatch({
        type: GET_WEEKPLANS_BY_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKPLANS_BY_USER,
        payload: err.data
      })
    );
};

// get weekplan by id
export const getWeekplanById = weekplan_id => dispatch => {
  axios
    .get(`/api/week-plan/${weekplan_id}`)
    .then(res =>
      dispatch({
        type: GET_WEEKPLAN_BY_ID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKPLAN_BY_ID,
        payload: null
      })
    );
};

//create weekplan
export const createWeekplan = (planname, history) => dispatch => {
  axios.post("/api/week-plan", planname).then(res => dispatch(getWeekplans()));
};

//add mealplan to weekplan
export const addMealplanToWeekplan = (weekplan_id, mealplan_id) => dispatch => {
  axios
    .post(`/api/week-plan/${weekplan_id}/${mealplan_id}`)
    .then(res => dispatch(getWeekplanById(weekplan_id)))
    .catch(err =>
      dispatch({
        type: ADD_MEALPLAN_TO_WEEKPLAN,
        payload: `there was an error adding the meal: ${err}`
      })
    );
};

//delete mealplan from weekplan
export const deleteMealplanFromWeekplan = (
  weekplan_id,
  mealplan_id,
  history
) => dispatch => {
  axios
    .delete(`/api/week-plan/${weekplan_id}/${mealplan_id}`)
    .then(res => dispatch(getWeekplanById(weekplan_id)))
    .then(res => history.push(`./${weekplan_id}`))
    .catch(err =>
      dispatch({
        type: GET_WEEKPLAN_BY_ID,
        payload: "there was an error deleting the meal"
      })
    );
};

//delete week plan
export const deleteWeekplan = (weekplan_id, user_id, history) => dispatch => {
  axios
    .delete(`/api/week-plan/${weekplan_id}`)
    .then(res => {
      dispatch(getWeekplansByUser(user_id));
    })
    .then(history.push("/week-plan"))
    .then(res =>
      dispatch({
        type: GET_WEEKPLANS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WEEKPLANS,
        payload: err.data
      })
    );
};
