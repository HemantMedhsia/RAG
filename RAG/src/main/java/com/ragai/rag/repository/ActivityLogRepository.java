package com.ragai.rag.repository;

import com.ragai.rag.entity.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityLogRepository
        extends JpaRepository<ActivityLog, Long> {

    // Last indexing activity time
    @Query("""
        select max(a.createdAt)
        from ActivityLog a
        where a.type = 'INDEXING'
    """)
    Optional<LocalDateTime> findLastIndexingTime();

    // Recent activities (top 5)
    @Query("""
        select a.message
        from ActivityLog a
        order by a.createdAt desc
        limit 5
    """)
    List<String> findTop5Messages();
}