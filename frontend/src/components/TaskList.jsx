import TaskCard from './TaskCard';
import TaskEmptyState from './TaskEmptyState';

function TaskList({ filteredTasks, filter, handleTaskChanged }) {
    // Kiểm tra, nếu không có mảng nhiệm vụ hoặc bằng 0 thì trả về giao diện trống
    if (!filteredTasks || filteredTasks.length === 0) {
        return <TaskEmptyState filter={filter} />;
    }

    return (
        <div className="space-y-3">
            {filteredTasks.map((task, index) => (
                <TaskCard key={task._id ?? index} task={task} index={index} handleTaskChanged={handleTaskChanged} />
            ))}
        </div>
    );
}

export default TaskList;
