import moment from "moment";

export default {
  getFullYear(date) {
    return moment(date).format("YYYY");
  },
};
