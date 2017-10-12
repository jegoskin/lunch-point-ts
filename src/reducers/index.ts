import { combineReducers } from 'redux';
import logs from './logs';
import lunchTime from './lunchTime';

const app = combineReducers({
	logs,
	lunchTime
})
export default app;