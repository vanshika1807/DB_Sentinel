package com.dbsentinel.repo;

import com.dbsentinel.model.MetricRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MetricRecordRepository extends JpaRepository<MetricRecord, Long> {
  List<MetricRecord> findTop120ByOrderByTsDesc();
}
