function Footer({ activeTasksCount, completedTasksCount }) {
    return (
        <>
            {completedTasksCount + activeTasksCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {completedTasksCount > 0 && (
                            <span>
                                Tuyệt vời bạn đã hoàn thành {completedTasksCount} nhiệm vụ
                                {activeTasksCount > 0 && `, còn ${activeTasksCount} nhiệm vụ nữa thôi. Cố lên!`}
                            </span>
                        )}

                        {completedTasksCount === 0 && activeTasksCount > 0 && (
                            <>Hãy bắt đầu làm {activeTasksCount} nhiệm vụ nào!</>
                        )}
                    </p>
                </div>
            )}
        </>
    );
}

export default Footer;
