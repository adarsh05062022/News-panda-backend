import mongoose from "mongoose";

const executionTimeSchema = new mongoose.Schema({
    lastExecutionTime: {
        type: Date,
        required: true
    }
});

const ExecutionTime = mongoose.model('ExecutionTime', executionTimeSchema);

export default ExecutionTime;