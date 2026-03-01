package com.ragai.rag.repository;

import com.ragai.rag.entity.QueryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryLogRepository
        extends JpaRepository<QueryLog, Long> {

    // Total queries asked
    long count();

    // Average response time in milliseconds
    @Query("select coalesce(avg(q.responseTimeMs), 0) from QueryLog q")
    Double findAverageResponseTime();
}
