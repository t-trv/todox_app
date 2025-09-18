import AddTask from '@/components/AddTask';
import DateTimeFilter from '@/components/DateTimeFilter';
import Header from '@/components/Header';
import StatsAndFilter from '@/components/StatsAndFilter';
import TaskList from '@/components/TaskList';
import Footer from '@/components/Footer';
import React, { useEffect, useState } from 'react';
import TaskListPagination from '@/components/TaskListPagination';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

function HomePage() {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState('all');
    const [dateQuery, setDateQuery] = useState('today');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    useEffect(() => {
        setPage(1);
    }, [filter, dateQuery]);

    // Logic get data
    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompleteTaskCount(res.data.completeCount);
        } catch (error) {
            console.error('Loi xay ra khi truy van tasks: ', error);
            toast.error('Loi xay ra khi truy van tasks: ', error);
        }
    };

    const handleTaskChanged = () => {
        fetchTasks();
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // filtered tasks
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active':
                return task.status === 'active';
            case 'completed':
                return task.status === 'complete';
            default:
                return true;
        }
    });

    const visibleTasks = filteredTasks.slice((page - 1) * visibleTaskLimit, page * visibleTaskLimit);
    if (visibleTasks.length === 0) {
        handlePreviousPage();
    }

    // Tổng số pages đang có
    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    return (
        <div className="min-h-screen w-full bg-[#f8fafc] relative">
            {/* Soft Morning Mist Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                linear-gradient(135deg, 
                rgba(248,250,252,1) 0%, 
                rgba(219,234,254,0.7) 30%, 
                rgba(165,180,252,0.5) 60%, 
                rgba(129,140,248,0.6) 100%
                ),
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
            `,
                }}
            />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    {/* Đầu trang */}
                    <Header />

                    {/* Tạo nhiệm vụ mới */}
                    <AddTask handNewTaskAdded={handleTaskChanged} />

                    {/* Thống kê và bộ lọc */}
                    <StatsAndFilter
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount}
                    />

                    {/* Danh sách nhiệm vụ */}
                    <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged} />

                    {/* Phân trang và lọc theo date */}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                            handlePageChange={handlePageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
                    </div>

                    {/* Chân trang */}
                    <Footer activeTasksCount={activeTaskCount} completedTasksCount={completeTaskCount} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
